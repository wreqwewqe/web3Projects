import React from 'react'
import {Button,message} from "antd"
import CreateEvidence from "./CreateEvidence"
import ViewEvidence from "./ViewEvidence"
import EvidenceContent from "./EvidenceContent"
import Sign from "./Sign"
export default function MutiSign() {
  return (
    <div>
        <CreateEvidence></CreateEvidence>
        <ViewEvidence></ViewEvidence>
        <Sign></Sign>
        <EvidenceContent></EvidenceContent>
        
    </div>
  )
}
