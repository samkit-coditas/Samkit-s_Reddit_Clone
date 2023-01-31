import { atom } from "recoil";
export interface AuthModalState {
  open: boolean;
  view: ModalView;
}
export type ModalView = "login" | "signUp" | "resetPassword";
const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
