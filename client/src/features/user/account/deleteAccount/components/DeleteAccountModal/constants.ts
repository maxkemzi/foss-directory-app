interface FormState {
	success: boolean;
	error: string | null;
	triggerStatusHandler: boolean;
}

const INITIAL_FORM_STATE: FormState = {
	success: false,
	error: null,
	triggerStatusHandler: false
};

export type {FormState};
export {INITIAL_FORM_STATE};
