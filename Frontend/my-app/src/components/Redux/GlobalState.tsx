import ProductModel from "../../Models/ProductModel";

export class GlobalState {
  public products: [] | any;
  public username: any;
  public userid: any;
  public vecation: ProductModel| any;
 
}
export class AuthState {
  public username: string | null | undefined;
  public constructor() {
    const storageUser: string | null = sessionStorage.getItem("user");
    const user =  storageUser ? JSON.parse(storageUser) : null;
    if (user) {
      this.username = user.username;
    }
  console.log(user.username);
  
  }
}
export enum StateActionType {
  SetProducts = "SetProducts",
  SetUsername = "SetUsername",
  Setuserid = "Setuserid",
  Setvecation = "Setvecation"
}

export interface StateAction {
  type: StateActionType;
  payload?: string;
}

export function SetUsernameAction(username: string|any): StateAction {
  return {
    type: StateActionType.SetUsername,
    payload: username
  };
}
export function Setuserid(userid: string|any): StateAction {
  return {
    type: StateActionType.Setuserid,
    payload: userid
  };
}

export function Setvecation(vecation: {}|any): StateAction {
  return {
    type: StateActionType.Setvecation,
    payload: vecation
  };
}
export function SetProducts(Products: ProductModel|any): StateAction {
  return {
    type: StateActionType.SetProducts,
    payload: Products
  };
}

export function stateReducer(
  currentState: GlobalState = new GlobalState(),
  action: StateAction
): GlobalState {
  switch (action.type) {
    case StateActionType.SetUsername:
      return {
    
        ...currentState,
        username: action.payload as string
      }
      case StateActionType.Setuserid:
        return {
      
          ...currentState,
          userid: action.payload as string
        }
        case StateActionType.Setvecation:
          return {
        
            ...currentState,
            vecation: action.payload as string
          }
          case StateActionType.SetProducts:
          return {
        
            ...currentState,
            products: action.payload as unknown as ProductModel
          }
    default:
      return currentState;
  }
}


