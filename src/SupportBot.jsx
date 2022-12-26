import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowRight, HelpCircle, X, XCircle } from "react-feather";
import { motion } from 'framer-motion';
import { toast, Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
import { browserName, browserVersion, osName, osVersion } from "react-device-detect";

export default function SupportBot({ projectKey, user }) {
    const ref = useRef(null);
    // first option menu
    const [popup, setPopup] = useState(false);
    // bigger focus nesting into an option
    const [focused, setFocused] = useState(false);
    const [border, setBorder] = useState('none');
    const [border2, setBorder2] = useState('none');
    const [focusId, setFocusId] = useState(null);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    async function newRequest(request) {
        return fetch('https://t6hfvo.deta.dev/api/new-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(data => data.json()).catch(error => console.log(error));
    }

    async function handleSubmit() {
        if (focusId === 0) {
            if (subject.length > 5 && description.length > 10) {
                const request = {
                    key: crypto.randomUUID().substring(0,13),
                    subject,
                    description,
                    user,
                    device: browserName + " " + browserVersion + ", " + osName + " " + osVersion,
                    notes: [],
                    time: new Date().getTime(),
                    state: 'active',
                    archived: false,
                    opened: false
                };
                const res = await newRequest({request, projectKey});
                if (res === null){
                    // request was posted
                    setFocusId(null);
                    toast("Thanks. Your request has been submitted. You'll hear back as soon as possible.");
                } else {
                    console.log(res);
                    toast("Support Bob ran into an error submitting the request. Please try again")
                }
            } else {
                toast("Please enter a subject and description.");
            }
        }
    }


    return (
        // you must position this component in a div with position fixed and width and height set at 100%
        // this component does not have an email or phone number or first name input so you must pass these when sending the request

        <div ref={ref} style={{ position: 'absolute', bottom: 96, right: 16 }}>
            <Toaster toastOptions={{
                style:
                {
                    fontFamily: "Inter",
                    background: "#F9F3EE",
                    borderRadius: "12px"
                }
            }} />
            <div style={{ maxWidth: 340, gap: 16, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>

                {focusId == 0 ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <X
                            onClick={() => {
                                setFocusId(null);
                            }}
                            style={{ cursor: "pointer", marginLeft: "auto", marginBottom: -12, zIndex: 1, background: "red", color: "white", borderRadius: 16, padding: 2 }} />

                        <motion.div
                            initial={{ y: 16 }}
                            animate={{ y: 0 }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                background: "#f3f3f3",
                                padding: 16,
                                gap: 16,
                                borderRadius: 16
                            }}
                        >
                            <h3>Leave us a message</h3>
                            <p><b>Subject</b></p>
                            <TextField
                            multiline='true'
                            maxRows={3}
                                onFocus={() => {
                                    setBorder('1px solid #B2E0F2');
                                }}
                                onBlur={() => {
                                    setBorder('none');
                                }}
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}
                                style={{ background: "white", borderRadius: "4px" }} />

                            <p><b>Description</b></p>
                            <p>Please describe your request in as much detail as you can. We'll be in touch with you as soon as possible</p>
                            <TextField
                            multiline='true'Ï
                            minRows = {3}
                            maxRows = {6}
                                onFocus={() => {
                                    setBorder2('1px solid #B2E0F2');
                                }}
                                onBlur={() => {
                                    setBorder2('none');
                                }}
                                value={description}
                                type='text'
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                style={{
                                    background: "white", width: 300, minHeight: 50, borderRadius: "4px"
                                }} />

                            <Button
                                onClick={() => {
                                    handleSubmit();
                                }}
                                style={{ borderRadius: 32, background: "#2A2550", color: "white" }}>
                                Send
                            </Button>
                        </motion.div>
                    </div>
                    :
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {popup ? <motion.div
                            initial={{ y: 16 }}
                            animate={{ y: 0 }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                background: "#f3f3f3",
                                padding: 16,
                                gap: 8,
                                borderRadius: 16
                            }}
                        >
                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setFocused(true);
                                    setFocusId(0);
                                }}>Contact us</p>
                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setFocused(true);
                                    setFocusId(1);
                                }}>Suggest an improvement</p>
                        </motion.div>
                            :
                            ""}
                        <motion.div style={{ marginLeft: 'auto' }}>
                            <Button style={{ borderRadius: 32, background: "#2A2550", color: "white" }}
                                onClick={() => {
                                    setPopup(!popup);
                                }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    {popup ? <XCircle /> : <HelpCircle />}
                                    <p>{popup ? "Close" : "Support"}</p>
                                </div>
                            </Button>
                        </motion.div>
                    </div>
                }
            </div>
        </div>
    )
}