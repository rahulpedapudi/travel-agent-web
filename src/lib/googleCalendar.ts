// Google Calendar API Integration
// Creates a "Travel Plans" calendar and adds itinerary events

import type { ItineraryDay, ItineraryActivity } from "@/types/ui";

// Google API types
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: TokenClientConfig) => TokenClient;
        };
      };
    };
    gapi?: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: { discoveryDocs: string[] }) => Promise<void>;
        setToken: (token: { access_token: string }) => void;
        calendar: {
          calendarList: {
            list: () => Promise<CalendarListResponse>;
            insert: (params: {
              resource: { summary: string; description?: string };
            }) => Promise<CalendarResponse>;
          };
          calendars: {
            insert: (params: {
              resource: { summary: string; description?: string; timeZone?: string };
            }) => Promise<CalendarResponse>;
          };
          events: {
            insert: (params: {
              calendarId: string;
              resource: CalendarEvent;
            }) => Promise<EventResponse>;
          };
        };
      };
    };
  }
}

interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: TokenResponse) => void;
}

interface TokenClient {
  requestAccessToken: () => void;
}

interface TokenResponse {
  access_token?: string;
  error?: string;
}

interface CalendarListResponse {
  result: {
    items?: Array<{ id: string; summary: string }>;
  };
}

interface CalendarResponse {
  result: { id: string };
}

interface CalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  colorId?: string;
}

interface EventResponse {
  result: { id: string; htmlLink: string };
}

// Constants
const SCOPES = "https://www.googleapis.com/auth/calendar";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const TRAVEL_CALENDAR_NAME = "Travel Plans ✈️";

// State
let gapiInited = false;
let gisInited = false;
let tokenClient: TokenClient | null = null;
let accessToken: string | null = null;

/**
 * Load the Google API script dynamically
 */
export const loadGoogleAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.gapi && window.google?.accounts) {
      resolve();
      return;
    }

    // Load GAPI
    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => {
      window.gapi?.load("client", async () => {
        try {
          await window.gapi?.client.init({
            discoveryDocs: [DISCOVERY_DOC],
          });
          gapiInited = true;
          checkBothLoaded(resolve);
        } catch (error) {
          reject(error);
        }
      });
    };
    gapiScript.onerror = reject;
    document.body.appendChild(gapiScript);

    // Load GIS (Google Identity Services)
    const gisScript = document.createElement("script");
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => {
      gisInited = true;
      checkBothLoaded(resolve);
    };
    gisScript.onerror = reject;
    document.body.appendChild(gisScript);
  });
};

const checkBothLoaded = (resolve: () => void) => {
  if (gapiInited && gisInited) {
    resolve();
  }
};

/**
 * Initialize the token client for OAuth
 */
export const initTokenClient = (): void => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("VITE_GOOGLE_CLIENT_ID not configured");
  }

  tokenClient = window.google?.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: SCOPES,
    callback: (response: TokenResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
      accessToken = response.access_token || null;
    },
  }) || null;
};

/**
 * Request access token (triggers OAuth popup)
 */
export const requestAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      initTokenClient();
    }

    if (!tokenClient) {
      reject(new Error("Failed to initialize token client"));
      return;
    }

    // Override callback for this specific request
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    tokenClient = window.google?.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: (response: TokenResponse) => {
        if (response.error) {
          reject(new Error(response.error));
        } else if (response.access_token) {
          accessToken = response.access_token;
          // Set the token on gapi client so Calendar API calls are authenticated
          window.gapi?.client.setToken({ access_token: response.access_token });
          resolve(response.access_token);
        }
      },
    }) || null;

    tokenClient?.requestAccessToken();
  });
};

/**
 * Find or create the Travel Plans calendar
 */
export const getOrCreateTravelCalendar = async (): Promise<string> => {
  if (!window.gapi?.client?.calendar) {
    throw new Error("Calendar API not loaded");
  }

  // Check if calendar already exists
  const listResponse = await window.gapi.client.calendar.calendarList.list();
  const calendars = listResponse.result.items || [];
  const existingCalendar = calendars.find(
    (cal) => cal.summary === TRAVEL_CALENDAR_NAME
  );

  if (existingCalendar) {
    return existingCalendar.id;
  }

  // Create new calendar (use calendars.insert, not calendarList.insert)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const createResponse =
    await window.gapi.client.calendar.calendars.insert({
      resource: {
        summary: TRAVEL_CALENDAR_NAME,
        description: "Your travel itineraries from Travel Agent AI",
        timeZone,
      },
    });

  return createResponse.result.id;
};

/**
 * Convert itinerary activity to calendar event
 */
const activityToEvent = (
  activity: ItineraryActivity,
  dateStr: string,
  timeZone: string
): CalendarEvent => {
  // Get activity title
  const title = activity.place?.name || activity.title || "Activity";

  // Get start time
  const startTime = activity.time || activity.start_time || "09:00";
  const endTime = activity.end_time || addHour(startTime);

  // Create ISO datetime strings
  const startDateTime = `${dateStr}T${startTime}:00`;
  const endDateTime = `${dateStr}T${endTime}:00`;

  return {
    summary: title,
    description: activity.description || activity.notes?.join("\n"),
    location: activity.location,
    start: { dateTime: startDateTime, timeZone },
    end: { dateTime: endDateTime, timeZone },
  };
};

/**
 * Add 1 hour to a time string
 */
const addHour = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const newHours = (hours + 1) % 24;
  return `${String(newHours).padStart(2, "0")}:${String(minutes || 0).padStart(2, "0")}`;
};

/**
 * Add itinerary to Google Calendar
 */
export const addItineraryToCalendar = async (
  days: ItineraryDay[],
  tripName?: string
): Promise<{ success: boolean; eventsCreated: number; calendarUrl: string }> => {
  // Ensure API is loaded
  await loadGoogleAPI();

  // Get access token (may trigger OAuth popup)
  if (!accessToken) {
    await requestAccessToken();
  }

  // Get or create the travel calendar
  const calendarId = await getOrCreateTravelCalendar();

  // Get user's timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let eventsCreated = 0;

  // Add events for each day
  for (const day of days) {
    for (const activity of day.activities) {
      const event = activityToEvent(activity, day.date, timeZone);

      // Add trip name to event title if provided
      if (tripName) {
        event.summary = `${event.summary} (${tripName})`;
      }

      try {
        await window.gapi?.client.calendar.events.insert({
          calendarId,
          resource: event,
        });
        eventsCreated++;
      } catch (error) {
        console.error("Failed to create event:", error);
      }
    }
  }

  // Generate calendar URL
  const calendarUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`;

  return {
    success: true,
    eventsCreated,
    calendarUrl,
  };
};

/**
 * Check if user has already authorized
 */
export const isAuthorized = (): boolean => {
  return !!accessToken;
};
