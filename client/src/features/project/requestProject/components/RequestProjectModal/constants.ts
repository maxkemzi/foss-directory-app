interface FormState {
	success: boolean;
	error: string | null;
	triggerStatusHandler: boolean;
	projectId: string | null;
	projectRoleId: string | null;
}

const INITIAL_FORM_STATE: FormState = {
	success: false,
	error: null,
	triggerStatusHandler: false,
	projectId: null,
	projectRoleId: null
};

export {INITIAL_FORM_STATE};
export type {FormState};
