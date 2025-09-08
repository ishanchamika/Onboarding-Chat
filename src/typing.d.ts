// Declare the global FB namespace for Facebook JS SDK
declare namespace FB {
  interface InitParams {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
  }

  interface LoginOptions {
    scope?: string;
  }

  interface ApiResponse {
    status?: string;
    authResponse?: {
      accessToken: string;
      userID: string;
      expiresIn: number;
      signedRequest: string;
    };
    error?: any;
  }

  interface UserResponse {
    name?: string;
    id?: string;
    error?: any;
  }

  function init(params: InitParams): void;
  function getLoginStatus(callback: (response: ApiResponse) => void): void;
  function login(callback: (response: ApiResponse) => void, options?: LoginOptions): void;
  function api(path: string, params: { fields: string }, callback: (response: UserResponse) => void): void;
}

declare var FB: FB;