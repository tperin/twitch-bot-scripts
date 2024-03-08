export type NukeCode = { alpha?: string; bravo?: string; charlie?: string };
export type DashboardData = {
  data: {
    dashboard: {
      results: {
        nukecodes: {
          range: string[];
          codes: NukeCode[];
        }
      }
    }
  }
};