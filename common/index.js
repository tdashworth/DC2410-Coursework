define("Users", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserType;
    (function (UserType) {
        UserType[UserType["Internal"] = 0] = "Internal";
        UserType[UserType["External"] = 1] = "External";
    })(UserType = exports.UserType || (exports.UserType = {}));
});
define("Animals", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimalType;
    (function (AnimalType) {
        AnimalType[AnimalType["Cat"] = 0] = "Cat";
        AnimalType[AnimalType["Dog"] = 1] = "Dog";
        AnimalType[AnimalType["Bird"] = 2] = "Bird";
        AnimalType[AnimalType["Pig"] = 3] = "Pig";
    })(AnimalType = exports.AnimalType || (exports.AnimalType = {}));
    var Gender;
    (function (Gender) {
        Gender[Gender["Male"] = 0] = "Male";
        Gender[Gender["Female"] = 1] = "Female";
    })(Gender = exports.Gender || (exports.Gender = {}));
});
define("AdoptionRequests", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdoptionRequestStatus;
    (function (AdoptionRequestStatus) {
        AdoptionRequestStatus[AdoptionRequestStatus["Pending"] = 0] = "Pending";
        AdoptionRequestStatus[AdoptionRequestStatus["Approved"] = 1] = "Approved";
        AdoptionRequestStatus[AdoptionRequestStatus["Denied"] = 2] = "Denied";
    })(AdoptionRequestStatus = exports.AdoptionRequestStatus || (exports.AdoptionRequestStatus = {}));
});
