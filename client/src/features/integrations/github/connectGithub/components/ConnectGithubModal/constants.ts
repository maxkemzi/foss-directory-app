interface FormState {
	url: string | null;
	error: string | null;
	triggerStatusHandler: boolean;
}

const INITIAL_FORM_STATE: FormState = {
	url: null,
	error: null,
	triggerStatusHandler: false
};

export {INITIAL_FORM_STATE};
export type {FormState};
