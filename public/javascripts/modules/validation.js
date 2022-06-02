// Validates a string
export let validateInput = (input) => !input.match(/[|;$%"<>()+]/g);

export let validateEmail = (input) => !input.match(/[a-z]+@school.com/g);

export let validatePostcode = (input) => !input.match(/[A-Z]{2}([A-Z]|[1-9]{1,2})\s[1-9][A-Z]{2}/g);