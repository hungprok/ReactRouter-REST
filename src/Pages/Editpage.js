import React, { useState, useEffect } from "react";
import CandidateForm from "./CandidateForm";
import { useHistory } from "react-router-dom";

// let user = { isAuthenticated: false }
export default function Editpage(props) {

    console.log({ props });
    return (
        <div>
            <CandidateForm candidate={props} />
        </div>
    );
}