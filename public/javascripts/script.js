// Validates a string
export let validateInput = (input) => !input.match(/[|;$%"<>()+]/g);