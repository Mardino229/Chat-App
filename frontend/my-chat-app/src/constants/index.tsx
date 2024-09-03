export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

export const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const FIRST_NAME_REGEX =
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export const LAST_NAME_REGEX =
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export const BASE_URL = "http://localhost:3000";

export const REGISTER_URL = '/signup';

export const LOGIN_URL = '/login';

export const LOGOUT_URL = '/logout';

export const REFRESH_URL = '/refresh';

export const ACTOR_URL = '/actor/getActors';

export const RESET_MDP_URL = '/modifier-password';

export const NEW_MDP_URL = '/nouveau-password';

export const ROLE_USER = "USER";

export const ROLE_ADMIN = "ADMIN";


