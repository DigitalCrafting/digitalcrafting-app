import {Button, Col, H2, Panel, Row} from "@zoria-ui/react";
import {useEffect, useMemo} from "react";
import {FormControl, FormGroup} from "@zoria-ui/forms";
import {Form} from "@zoria-ui/forms-react";
import {TextFormInput} from "@zoria-ui/forms-inputs-react";

export const FormsDemo = () => {
    const form: FormGroup = useMemo(() => {
        const control = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl()
        });

        return control;
    }, []);

    useEffect(() => {
        const sub = form.onValueChanges((value) => {
            console.log(value);
        })

        return () => {
            sub.unsubscribe();
        }
    }, [form])

    return <Panel>
        <Panel.Header>
            <H2>Forms</H2>
        </Panel.Header>
        <Panel.Body>
            <Form formGroup={form}>
                <Col gap='sm'>
                    <Row className={'justify-center content-center'}>
                        <Col span={5} className={'justify-center align-items-center content-center'}>
                            <TextFormInput path='firstName' label='First name'/>
                        </Col>
                        <Col span={5} className={'justify-center align-items-center content-center'}>
                            <TextFormInput path='lastName' label='Last name'/>
                        </Col>
                    </Row>
                    <Row className={'justify-center content-center'}>
                        <Col span={8}>
                        </Col>
                        <Col span={2}>
                            <Button onClick={() => console.log(form.getValue())}>Submit</Button>
                        </Col>
                    </Row>
                </Col>
            </Form>
        </Panel.Body>
    </Panel>
}