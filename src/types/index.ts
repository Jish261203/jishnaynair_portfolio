export type Song = {
  url: string;
  cover: string;
  title: string;
  channel: string;
};



export type UmamiStats = {

    pageviews: number;
    visitors: number;
    visits: number;
    bounces: number;
    totaltime: number; // total time in seconds
    comparison: {
      pageviews: number;
      visitors: number;
      visits: number;
      bounces: number;
      totaltime: number;
    };
  };


  export type GuestbookEntry = {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    user: {
        name: string | null;
        image: string | null;
        role?: string;
        accounts: {
            providerId: string;
        }[];
    };
};


  export type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    message?: string;
};