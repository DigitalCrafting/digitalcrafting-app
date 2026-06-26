import {describe, expect, it, vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useFormArray, useFormControl, useFormElement, useFormGroup} from "./FormHooks";
import {FormPathContextProvider} from "./internal/FormPathContext";
import {ZoriaFormArray, ZoriaFormControl, ZoriaFormGroup} from "@zoria-ui/forms";
import {Form} from "./Form";

const MOCK_NESTED_FIRST = new ZoriaFormControl();
const MOCK_FIRST = new ZoriaFormGroup({
    'nestedFirst': MOCK_NESTED_FIRST
})
const MOCK_FIRST_ARRAY_ELEMENT = new ZoriaFormControl();
const MOCK_SECOND_ARRAY_ELEMENT = new ZoriaFormControl();
const MOCK_SECOND = new ZoriaFormArray([
    MOCK_FIRST_ARRAY_ELEMENT,
    MOCK_SECOND_ARRAY_ELEMENT
])
const MOCK_FORM_GROUP = new ZoriaFormGroup({
    'first': MOCK_FIRST,
    'second': MOCK_SECOND
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

    describe('useFormGroup', () => {
        it('should return element', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormGroup('first'), {
                wrapper
            });
            const actualElement = result.current.formGroupControl;

            // then
            expect(actualElement).toBe(MOCK_FIRST);
        });

        it('should throw an error', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            // then
            expect(() => {
                renderHook(() => useFormGroup('second'), {wrapper})
            }).toThrow('useFormGroup::element at second is not a FormGroup');
        });
    })

    describe('useFormArray', () => {
        it('should return element', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormArray('second'), {
                wrapper
            });
            const actualElement = result.current.formArrayControl;

            // then
            expect(actualElement).toBe(MOCK_SECOND);
        });

        it('should throw an error', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            // then
            expect(() => {
                renderHook(() => useFormArray('first'), {wrapper})
            }).toThrow('useFormArray::element at first is not a FormArray');
        });
    })

    describe('useFormControl', () => {
        it('should return element', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            const {result} = renderHook(() => useFormControl('first.nestedFirst'), {
                wrapper
            });
            const actualElement = result.current.control;

            // then
            expect(actualElement).toBe(MOCK_NESTED_FIRST);
        });

        it('should throw an error', () => {
            // given
            const wrapper = ({children}) => (
                <Form formGroup={MOCK_FORM_GROUP}>
                    {children}
                </Form>
            )

            // when
            // then
            expect(() => {
                renderHook(() => useFormControl('second'), {wrapper})
            }).toThrow('useFormControl::element at second is not a FormControl');
        });
    })
})