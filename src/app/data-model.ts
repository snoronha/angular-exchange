export class User {
    id:                 number;
    name_identifier:    string;
    email:              string;
    email_verified:     boolean;
    gender:             string;
    name:               string;
    family_name:        string;
    nickname:           string;
    sms_number:         string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

