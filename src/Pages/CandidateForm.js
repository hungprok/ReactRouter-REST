import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InputGroup, Row, Col, Form, Button, Container } from "react-bootstrap";

export default function CandidateForm(props) {

    console.log(props.candidate);
    console.log(props.candidate.match.params.id);
    let history = useHistory();
    // history.push('/candidates')

    let { id } = useParams(); // this is an alternative for props.candidate.match.id

    const [validated, setValidated] = useState(false);
    let [candidate, setCandidate] = useState({
        city: "",
        email: "",
        company: "",
        country: "",
        job_title: "",
        photo_url: "",
        last_name: "",
        first_name: ""
    });

    const getCandidate = async () => {
        try {
            // const response = await fetch(
            //     `http://localhost:3000/candidates/${props.candidate.match.params.id}`
            // );
            const response = await fetch(
                // `https://api.jsonbin.io/b/5e8cd9e3e583106bbe33f1c5/` + id

                // I am using Json bin so i cannot use id to trigger URL, therefore, I fetch the whole database instead

                `http://localhost:3001/candidates/${id}`
            );
            const data = await response.json();
            console.log(id);
            console.log(data);
            // let abc = data.filter(item => item.id == id)
            // console.log(abc);
            // setCandidate(abc[0]);
            setCandidate(data);
            console.log(candidate);
        } catch {
            console.log("Could not fetch candidate.");
        }
    };

    // useEffect(getCandidate());

    // id: 13
    // first_name: "Charles"
    // last_name: "Lee"
    // email: "sang@coderschool.vn"
    // gender: "male"
    // company: "CoderSchool"
    // job_title: "CEO"
    // city: "HCMC"
    // country: "Vietnam"
    // photo_url: "https://bit.ly/2FQhdr8"

    useEffect(() => {
        if (!props.candidate) {
            setCandidate(props.candidate);
            console.log(candidate);
        } else {
            getCandidate();
        }
    }, []);

    const updateCandidate = async () => {
        const config = {
            method: "PUT",
            body: JSON.stringify(candidate),
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch(

                // I am using Json bin so i cannot use id to trigger URL, therefore, I fetch the whole database instead

                `http://localhost:3001/candidates/${props.candidate.match.params.id}`,
                config
            );
            history.push("/candidates");
        } catch (error) {
            console.log("Oops");
        }
    };

    const onSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            updateCandidate();
        }
        setValidated(true);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <img src={candidate.photo_url} alt={candidate.first_name} />
                    <Form noValidate validated={validated} onSubmit={onSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    value={candidate.first_name}
                                    onChange={e =>
                                        setCandidate({ ...candidate, first_name: e.target.value })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a first name.
                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    value={candidate.last_name}
                                    onChange={e =>
                                        setCandidate({ ...candidate, last_name: e.target.value })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a last name.
                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={candidate.email}
                                        placeholder="john@email.com"
                                        onChange={e =>
                                            setCandidate({ ...candidate, email: e.target.value })
                                        }
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a email.
                  </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="City"
                                    value={candidate.city}
                                    onChange={e =>
                                        setCandidate({ ...candidate, city: e.target.value })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="U.S.A."
                                    value={candidate.country}
                                    onChange={e =>
                                        setCandidate({ ...candidate, country: e.target.value })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a country.
                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom06">
                                <Form.Label>Photo URL</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.photo_url}
                                    onChange={e =>
                                        setCandidate({
                                            ...candidate,
                                            photo_url: e.target.value
                                        })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a photo URL.
                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom07">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.company}
                                    placeholder="CoderSchool"
                                    onChange={e =>
                                        setCandidate({ ...candidate, company: e.target.value })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid company.
                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom08">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Developer"
                                    value={candidate.job_title}
                                    onChange={e =>
                                        setCandidate({ ...candidate, job_title: e.target.value })
                                    }
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid job title.
                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Save</Button>
                        <button className='btn btn-primary' onClick={()=>history.goBack()}>Back</button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}