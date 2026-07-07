import {
    Container,
    ExpandCollapsePanel,
    H2,
    H3,
    LaptopIcon,
    MonitorIcon,
    Row,
    SmartphoneIcon,
    Text
} from "@zoria-ui/react";
import {Tabs} from "@zoria-ui/react/src/components/tabs/Tabs.tsx";

export function TabsDocs() {
    return <ExpandCollapsePanel expandByDefault={true}>
        <ExpandCollapsePanel.Header><H2>Tabs</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
            <Row>
                <H3>Horizontal</H3>
            </Row>
            <Row>
                <Container>
                    <Tabs>
                        <Tabs.Item id='horiz-first-item'>
                            <Tabs.Trigger>
                                <Tabs.TriggerIcon>
                                    <SmartphoneIcon/>
                                </Tabs.TriggerIcon>
                                <Tabs.TriggerLabel>First</Tabs.TriggerLabel>
                            </Tabs.Trigger>
                            <Tabs.Body>
                                <Container>
                                    <Text>First item body</Text>
                                </Container>
                            </Tabs.Body>
                        </Tabs.Item>
                        <Tabs.Item id='horiz-second-item'>
                            <Tabs.Trigger>
                                <Tabs.TriggerIcon>
                                    <LaptopIcon/>
                                </Tabs.TriggerIcon>
                                <Tabs.TriggerLabel>Second</Tabs.TriggerLabel>
                            </Tabs.Trigger>
                            <Tabs.Body>
                                <Container>
                                    <Text>Second item body</Text>
                                </Container>
                            </Tabs.Body>
                        </Tabs.Item>
                        <Tabs.Item id='horiz-third-item'>
                            <Tabs.Trigger>
                                <Tabs.TriggerIcon>
                                    <MonitorIcon/>
                                </Tabs.TriggerIcon>
                                <Tabs.TriggerLabel>Third</Tabs.TriggerLabel>
                            </Tabs.Trigger>
                            <Tabs.Body>
                                <Container>
                                    <Text>Third item body</Text>
                                </Container>
                            </Tabs.Body>
                        </Tabs.Item>
                    </Tabs>
                </Container>
            </Row>
            <Row><H3>Vertical</H3></Row>
            <Row>
               <Container>
                   <Tabs vertical>
                       <Tabs.Item id='vert-first-item'>
                           <Tabs.Trigger>
                               <Tabs.TriggerIcon>
                                   <SmartphoneIcon/>
                               </Tabs.TriggerIcon>
                               <Tabs.TriggerLabel>First</Tabs.TriggerLabel>
                           </Tabs.Trigger>
                           <Tabs.Body>
                               <Container>
                                   <Text>First item body</Text>
                               </Container>
                           </Tabs.Body>
                       </Tabs.Item>
                       <Tabs.Item id='vert-second-item'>
                           <Tabs.Trigger>
                               <Tabs.TriggerIcon>
                                   <LaptopIcon/>
                               </Tabs.TriggerIcon>
                               <Tabs.TriggerLabel>Second</Tabs.TriggerLabel>
                           </Tabs.Trigger>
                           <Tabs.Body>
                               <Container>
                                   <Text>Second item body</Text>
                               </Container>
                           </Tabs.Body>
                       </Tabs.Item>
                       <Tabs.Item id='vert-third-item'>
                           <Tabs.Trigger>
                               <Tabs.TriggerIcon>
                                   <MonitorIcon/>
                               </Tabs.TriggerIcon>
                               <Tabs.TriggerLabel>Third</Tabs.TriggerLabel>
                           </Tabs.Trigger>
                           <Tabs.Body>
                               <Container>
                                   <Text>Third item body</Text>
                               </Container>
                           </Tabs.Body>
                       </Tabs.Item>
                   </Tabs>
               </Container>
            </Row>
            <Row>
                <H3>Horizontal - no border</H3>
            </Row>
            <Row>
                <Container>
                    <Tabs removeBorder>
                        <Tabs.Item id='horiz-first-item'>
                            <Tabs.Trigger>
                                <Tabs.TriggerIcon>
                                    <SmartphoneIcon/>
                                </Tabs.TriggerIcon>
                                <Tabs.TriggerLabel>First</Tabs.TriggerLabel>
                            </Tabs.Trigger>
                            <Tabs.Body>
                                <Container>
                                    <Text>First item body</Text>
                                </Container>
                            </Tabs.Body>
                        </Tabs.Item>
                        <Tabs.Item id='horiz-second-item'>
                            <Tabs.Trigger>
                                <Tabs.TriggerIcon>
                                    <LaptopIcon/>
                                </Tabs.TriggerIcon>
                                <Tabs.TriggerLabel>Second</Tabs.TriggerLabel>
                            </Tabs.Trigger>
                            <Tabs.Body>
                                <Container>
                                    <Text>Second item body</Text>
                                </Container>
                            </Tabs.Body>
                        </Tabs.Item>
                        <Tabs.Item id='horiz-third-item'>
                            <Tabs.Trigger>
                                <Tabs.TriggerIcon>
                                    <MonitorIcon/>
                                </Tabs.TriggerIcon>
                                <Tabs.TriggerLabel>Third</Tabs.TriggerLabel>
                            </Tabs.Trigger>
                            <Tabs.Body>
                                <Container>
                                    <Text>Third item body</Text>
                                </Container>
                            </Tabs.Body>
                        </Tabs.Item>
                    </Tabs>
                </Container>
            </Row>
            <Row><H3>Vertical - no border</H3></Row>
            <Row>
               <Container>
                   <Tabs vertical removeBorder>
                       <Tabs.Item id='vert-first-item'>
                           <Tabs.Trigger>
                               <Tabs.TriggerIcon>
                                   <SmartphoneIcon/>
                               </Tabs.TriggerIcon>
                               <Tabs.TriggerLabel>First</Tabs.TriggerLabel>
                           </Tabs.Trigger>
                           <Tabs.Body>
                               <Container>
                                   <Text>First item body</Text>
                               </Container>
                           </Tabs.Body>
                       </Tabs.Item>
                       <Tabs.Item id='vert-second-item'>
                           <Tabs.Trigger>
                               <Tabs.TriggerIcon>
                                   <LaptopIcon/>
                               </Tabs.TriggerIcon>
                               <Tabs.TriggerLabel>Second</Tabs.TriggerLabel>
                           </Tabs.Trigger>
                           <Tabs.Body>
                               <Container>
                                   <Text>Second item body</Text>
                               </Container>
                           </Tabs.Body>
                       </Tabs.Item>
                       <Tabs.Item id='vert-third-item'>
                           <Tabs.Trigger>
                               <Tabs.TriggerIcon>
                                   <MonitorIcon/>
                               </Tabs.TriggerIcon>
                               <Tabs.TriggerLabel>Third</Tabs.TriggerLabel>
                           </Tabs.Trigger>
                           <Tabs.Body>
                               <Container>
                                   <Text>Third item body</Text>
                               </Container>
                           </Tabs.Body>
                       </Tabs.Item>
                   </Tabs>
               </Container>
            </Row>
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}