import {Button, Col, Grid, H2, Panel, Row} from "@zoria-ui/react";
import {useEffect, useMemo} from "react";
import {
    createForm,
    ZObject,
    ZoriaFormArray,
    ZoriaFormControl,
    ZoriaFormGroup,
    ZoriaValidators,
    ZString
} from "@zoria-ui/forms";
import {Form} from "@zoria-ui/forms-react";
import {TextFormInput} from "@zoria-ui/forms-inputs-react";

const formArrayElementSchema = ZObject().withFields({
    field1: ZString(),
    field2: ZString(),
    field3: ZString(),
})

export const FormsDocs = () => {
    const formArray: ZoriaFormArray = useMemo(() => {
        const control = new ZoriaFormArray();

        control.setElementsFactory(() => createForm(formArrayElementSchema))

        return control;
    }, [])

    const form: ZoriaFormGroup = useMemo(() => {

        const control = new ZoriaFormGroup({
            firstName: new ZoriaFormControl(),
            middleName: new ZoriaFormControl(),
            lastName: new ZoriaFormControl(),
            testArray: formArray,
            testGroup: new ZoriaFormGroup({
                groupField1: new ZoriaFormControl(null, [ZoriaValidators.required()]),
                groupField2: new ZoriaFormControl(),
                groupField3: new ZoriaFormControl(),
            })
        });

        return control;
    }, []);

    useEffect(() => {
        const sub = form.onValueChanges((value) => {
            console.log(value);
        })

        const validitySub = form.onValidityChanges((valid) => {
            console.log(valid)
            console.log(form.getErrorsTree())
        })

        return () => {
            sub.unsubscribe();
            validitySub.unsubscribe();
        }
    }, [form])

    return <Panel>
        <Panel.Header>
            <H2>Forms</H2>
        </Panel.Header>
        <Panel.Body>
            <Col span={12} className='justify-center align-items-center'>
                <Form formGroup={form}>
                    <Row gap='lg' className={'justify-center content-center'}>
                        <Grid cols={12} gap='sm'>
                            <Grid.Col className={'justify-center align-items-center content-center'}>
                                <TextFormInput path='firstName' label='First name'/>
                            </Grid.Col>
                            <Grid.Col className={'justify-center align-items-center content-center'}>
                                <TextFormInput path='middleName' label='Middle name'/>
                            </Grid.Col>
                            <Grid.Col className={'justify-center align-items-center content-center'}>
                                <TextFormInput path='lastName' label='Last name'/>
                            </Grid.Col>
                        </Grid>
                    </Row>
                    <Row gap='lg' className={'justify-center content-center'}>
                        <Form.Array path={'testArray'}>
                            <Grid.Col span={5}>
                                <TextFormInput path='field1' label='Field 1'/>
                            </Grid.Col>
                            <Grid.Col span={5}>
                                <TextFormInput path='field2' label='Field 2'/>
                            </Grid.Col>
                            <Grid.Col span={5}>
                                <TextFormInput path='field3' label='Field 3'/>
                            </Grid.Col>
                        </Form.Array>
                    </Row>
                    <Row gap='lg' className={'justify-center content-center'}>
                        <Form.Group path='testGroup'>
                            <Form.Group.Title>Test form group</Form.Group.Title>
                            <Form.Group.Body>
                                <Grid.Col>
                                    <TextFormInput path='groupField1' label='Group Field 1'/>
                                </Grid.Col>
                                <Grid.Col>
                                    <TextFormInput path='groupField2' label='Group Field 2'/>
                                </Grid.Col>
                                <Grid.Col>
                                    <TextFormInput path='groupField3' label='Group Field 3'/>
                                </Grid.Col>
                            </Form.Group.Body>
                        </Form.Group>
                    </Row>
                    <Row gap='lg' className={'justify-center content-center'}>
                        <Col span={10}>
                        </Col>
                        <Col span={2}>
                            <Button onClick={() => console.log(form.getValue())}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Panel.Body>
    </Panel>
}