class ProfileCustomizationStrategy {
    applyChange(userProfile, change) {
        throw new Error("Method 'applyChange()' must be implemented.");
    }
}

export class UsernameStrategy extends ProfileCustomizationStrategy {
    applyChange(userProfile, username) {
        return { ...userProfile, username };
    }
}

export class EmailStrategy extends ProfileCustomizationStrategy {
    applyChange(userProfile, email) {
        return { ...userProfile, email };
    }
}

export class UniversityStrategy extends ProfileCustomizationStrategy {
    applyChange(userProfile, university) {
        return { ...userProfile, university };
    }
}

export class MajorStrategy extends ProfileCustomizationStrategy {
    applyChange(userProfile, major) {
        return { ...userProfile, major };
    }
}

export class AgeStrategy extends ProfileCustomizationStrategy {
    applyChange(userProfile, age) {
        return { ...userProfile, age: parseInt(age) };
    }
}

export class LocationStrategy extends ProfileCustomizationStrategy {
    applyChange(userProfile, location) {
        return { ...userProfile, location };
    }
}
