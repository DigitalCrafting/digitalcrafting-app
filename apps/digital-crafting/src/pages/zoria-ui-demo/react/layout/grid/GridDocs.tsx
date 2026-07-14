import './GridDocs.scss';
import {Col, ExpandCollapse, H2} from "@zoria-ui/react";
import {GridDocsCode, GridDocsDemo} from "./GridDocsExample.tsx";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const GridDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Grid</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col gap='lg' className='grid-docs'>
                    <ExpandCollapse expandByDefault>
                        <ExpandCollapse.Trigger>
                            <H2>Grid gaps</H2>
                        </ExpandCollapse.Trigger>
                        <ExpandCollapse.Body>
                            <Col gap='lg'>
                                <GridDocsDemo gap='sm' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsDemo gap='md' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsDemo gap='lg' spans={[4, 4, 4]} cols={12}/>
                            </Col>
                        </ExpandCollapse.Body>
                    </ExpandCollapse>
                    <ExpandCollapse>
                        <ExpandCollapse.Trigger>
                            <H2>Grid spans</H2>
                        </ExpandCollapse.Trigger>
                        <ExpandCollapse.Body>
                            <Col gap='lg'>
                                <GridDocsDemo gap='md' spans={[6, 6]} cols={12}/>
                                <div/>
                                <GridDocsDemo gap='md' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsDemo gap='md' spans={[3, 3, 3, 3]} cols={12}/>
                                <div/>
                                <GridDocsDemo gap='md' spans={[6, 3, 3]} cols={12}/>
                            </Col>
                        </ExpandCollapse.Body>
                    </ExpandCollapse>
                    <ExpandCollapse>
                        <ExpandCollapse.Trigger>
                            <H2>Grid columns</H2>
                        </ExpandCollapse.Trigger>
                        <ExpandCollapse.Body>
                            <Col gap='lg'>
                                <GridDocsDemo gap='md' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsDemo gap='md' spans={[4, 4, 4]} cols={8}/>
                                <div/>
                                <GridDocsDemo gap='md' spans={[4, 4, 4]} cols={6}/>
                            </Col>
                        </ExpandCollapse.Body>
                    </ExpandCollapse>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col gap='lg' className='grid-docs'>
                    <ExpandCollapse expandByDefault>
                        <ExpandCollapse.Trigger>
                            <H2>Grid gaps</H2>
                        </ExpandCollapse.Trigger>
                        <ExpandCollapse.Body>
                            <Col gap='sm'>
                                <GridDocsCode gap='sm' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsCode gap='md' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsCode gap='lg' spans={[4, 4, 4]} cols={12}/>
                            </Col>
                        </ExpandCollapse.Body>
                    </ExpandCollapse>
                    <ExpandCollapse>
                        <ExpandCollapse.Trigger>
                            <H2>Grid spans</H2>
                        </ExpandCollapse.Trigger>
                        <ExpandCollapse.Body>
                            <Col gap='sm'>
                                <GridDocsCode gap='md' spans={[6, 6]} cols={12}/>
                                <div/>
                                <GridDocsCode gap='md' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsCode gap='md' spans={[3, 3, 3, 3]} cols={12}/>
                                <div/>
                                <GridDocsCode gap='md' spans={[6, 3, 3]} cols={12}/>
                            </Col>
                        </ExpandCollapse.Body>
                    </ExpandCollapse>
                    <ExpandCollapse>
                        <ExpandCollapse.Trigger>
                            <H2>Grid columns</H2>
                        </ExpandCollapse.Trigger>
                        <ExpandCollapse.Body>
                            <Col gap='sm'>
                                <GridDocsCode gap='md' spans={[4, 4, 4]} cols={12}/>
                                <div/>
                                <GridDocsCode gap='md' spans={[4, 4, 4]} cols={8}/>
                                <div/>
                                <GridDocsCode gap='md' spans={[4, 4, 4]} cols={6}/>
                            </Col>
                        </ExpandCollapse.Body>
                    </ExpandCollapse>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>
}