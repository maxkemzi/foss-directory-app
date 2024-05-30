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

export {INITIAL_FORM_STATE};
export type {FormState};
