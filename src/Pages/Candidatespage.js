import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    ListGroup,
    Container,
    ListGroupItem
} from "react-bootstrap";

import {
    faMap,
    faEdit,
    faEnvelope,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function Candidatespage(props) {
    const [candidates, setCandidates] = useState([]);
    console.log(props);
    const onDeleteCandidate = id => {
        try {
            const config = { method: "DELETE" };
            fetch(`http://localhost:3000/candidates/${id}`, config);
            const newCandidates = candidates.filter(candidate => candidate.id !== id);
            setCandidates(newCandidates);
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    useEffect(() => {
        const getCandidates = async () => {
            const response = await fetch("http://localhost:3000/candidates");
            const data = await response.json();
            console.log(data);
            setCandidates(data);
        };
        getCandidates();
    }, []);


    return (
        <Container fluid>
            <Row>
                {candidates.map(candidate => {
                    return (
                        <Col lg="3" key={candidate.id}>
                            <Card>
                                <Card.Img variant="top" src={candidate.photo_url} />
                                <Card.Body>
                                    <Card.Title>
                                        {candidate.first_name + " " + candidate.last_name}
                                    </Card.Title>
                                    <Card.Text>{candidate.id}</Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <FontAwesomeIcon /> {candidate.company}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FontAwesomeIcon /> {candidate.job_title}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FontAwesomeIcon /> {candidate.gender}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FontAwesomeIcon /> {candidate.city}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FontAwesomeIcon icon={faMap} /> {candidate.country}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FontAwesomeIcon icon={faEnvelope} /> {candidate.email}
                                    </ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link onClick={() => onDeleteCandidate(candidate.id)}>
                                        <FontAwesomeIcon /> Remove
      </Card.Link>
                                    <Card.Link href={`/candidates/${candidate.id}`}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
      </Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
