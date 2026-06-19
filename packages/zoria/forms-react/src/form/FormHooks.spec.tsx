import {describe, expect, it} from "vitest";
import {renderHook} from "@testing-library/react";
import {useFormElement} from "./FormHooks";
import {FormPathContextProvider} from "./internal/FormPathContext";
import {ZoriaFormArray, ZoriaFormControl, ZoriaFormGroup} from "@zoria-ui/forms";
import {Form} from "./Form";

const MOCK_NESTED_FIRST = new ZoriaFormControl();
const MOCK_FIRST = new ZoriaFormGroup({
    'nestedFirst': MOCK_NESTED_FIRST
})
const MOCK_FIRST_ARRAY_ELEMENT = new ZoriaFormControl();
const MOCK_SECOND_ARRAY_ELEMENT = new ZoriaFormControl();

const MOCK_FORM_GROUP = new ZoriaFormGroup({
    'first': MOCK_FIRST,
    'second': new ZoriaFormArray([
        MOCK_FIRST_ARRAY_ELEMENT,
        MOCK_SECOND_ARRAY_ELEMENT
    ])
});

describe('FormHooks', () => {
    describe('useFormElement', () => {
        it('should return root element', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement(), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_FORM_GROUP);
        })

        it('should return element from path', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement('first'), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_FIRST);
        })

        it('should return element from nested path', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement('first.nestedFirst'), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_NESTED_FIRST);
        })

        it('should return element from current context', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    <FormPathContextProvider path='first'>
                        {children}
                    </FormPathContextProvider>
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement(), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_FIRST);
        })

        it('should return element from nested current context', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    <FormPathContextProvider path='first'>
                        <FormPathContextProvider path='nestedFirst'>
                            {children}
                        </FormPathContextProvider>
                    </FormPathContextProvider>
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement(), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_NESTED_FIRST);
        })

        it('should return element from nested current array', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    <FormPathContextProvider path='second'>
                        <FormPathContextProvider path='1'>
                            {children}
                        </FormPathContextProvider>
                    </FormPathContextProvider>
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement(), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_SECOND_ARRAY_ELEMENT);
        })

        it('should return element from path despite nested context', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    <FormPathContextProvider path='second'>
                        <FormPathContextProvider path='1'>
                            {children}
                        </FormPathContextProvider>
                    </FormPathContextProvider>
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormElement('first.nestedFirst'), {
                wrapper
            });
            const actualElement = result.current;

            // then
            expect(actualElement).toBe(MOCK_NESTED_FIRST);
        })
    })
})