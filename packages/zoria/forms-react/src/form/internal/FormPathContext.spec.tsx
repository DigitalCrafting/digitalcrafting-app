import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {FormPathContextProvider, useFormPath} from "./FormPathContext";

const DEFAULT_TEST_ID = 'mock-component';

const MockComponent = ({'data-testid': dataTestId = DEFAULT_TEST_ID, path = ''}) => {
    const currentPath = useFormPath(path);

    return <div data-testid={dataTestId} data-path={currentPath}>MockComponent</div>
}

const MockPathProvider = ({path = '', children}) => {
    return <FormPathContextProvider path={path}>
        {children}
    </FormPathContextProvider>
}

describe('FormPathContext', () => {
    it('should return path passed to component', () => {
        // given
        const expectedPath = 'my.test.path';

        // when
        render(<MockComponent path={expectedPath}/>)

        const renderedComponent = screen.getByTestId(DEFAULT_TEST_ID);
        const actualPath = renderedComponent.getAttribute('data-path');

        // then
        expect(actualPath).toEqual(expectedPath);
    })

    it('should return current path', () => {
        // given
        const expectedPath = 'my.test.path';

        // when
        render(<MockPathProvider path={expectedPath}><MockComponent/></MockPathProvider>);

        const renderedComponent = screen.getByTestId(DEFAULT_TEST_ID);
        const actualPath = renderedComponent.getAttribute('data-path');

        // then
        expect(actualPath).toEqual(expectedPath);
    })

    it('should build nested path', () => {
        // given
        const expectedPath = 'my.test.path';

        // when
        render(
            <MockPathProvider path='my'>
                <MockPathProvider path='test'>
                    <MockPathProvider path='path'>
                        <MockComponent/>
                    </MockPathProvider>
                </MockPathProvider>
            </MockPathProvider>
        );

        const renderedComponent = screen.getByTestId(DEFAULT_TEST_ID);
        const actualPath = renderedComponent.getAttribute('data-path');

        // then
        expect(actualPath).toEqual(expectedPath);
    })
})
