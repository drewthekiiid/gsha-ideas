"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Download, Share2 } from "lucide-react"

interface ConceptModalProps {
  isOpen: boolean
  onClose: () => void
  conceptName: string
  conceptData: any
}

const ConceptModal: React.FC<ConceptModalProps> = ({ isOpen, onClose, conceptName, conceptData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border-neutral-700 text-neutral-100">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            {conceptName}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>

        <div className="space-y-8">
          <div>
            <p className="text-xl text-orange-400 mb-2">{conceptData.tagline}</p>
            <p className="text-lg text-neutral-300">{conceptData.description}</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-neutral-200">Experience Journey</h3>
            <div className="grid gap-6">
              {conceptData.phases.map((phase: any, index: number) => (
                <Card key={phase.title} className="bg-neutral-800/50 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <span className="text-2xl">{phase.icon}</span>
                      <span className="text-orange-400">{phase.title}</span>
                      <Badge variant="outline" className="ml-auto">
                        Phase {index + 1}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300 leading-relaxed">{phase.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-neutral-200">Participant Feedback</h3>
            <blockquote className="text-xl italic text-center text-neutral-300 p-6 bg-neutral-800/30 rounded-lg border border-neutral-700">
              {conceptData.quote}
            </blockquote>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-neutral-200">Social Buzz</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {conceptData.socialCards.map((card: any, index: number) => (
                <Card key={index} className="bg-neutral-800/30 border-neutral-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="text-xs">{card.platform}</Badge>
                      <span className="text-xs text-neutral-400">{card.author}</span>
                    </div>
                    <p className="text-sm text-neutral-300">"{card.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-neutral-700">
            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Download className="h-4 w-4 mr-2" />
              Download Full Concept
            </Button>
            <Button variant="outline" className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800">
              <Share2 className="h-4 w-4 mr-2" />
              Share Concept
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConceptModal
