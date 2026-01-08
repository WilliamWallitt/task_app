import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWeatherApi} from 'openmeteo';
import {REST} from "~/utils/restAPI";
import {Note, User, UserDevice} from "@prisma/client";
import {AdminView, Hint, Image, Status, Task, View} from "~/components/tasks";
import {THEME} from "~/shared/navbar/navbar";

interface Params {
    latitude: number,
    longitude: number,
    hourly: string[],
    daily: string[]
}

export type UserImage = {id: number | undefined, image: string | undefined} | null

export type UserImageObject = {image: UserImage}


interface WithUserDevices {
    devices: UserDevice[]
}

export type UserWithImage = User & UserImageObject & WithUserDevices

const url = "https://api.open-meteo.com/v1/forecast";

const geolocationUrl = (query: string): string => `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`

const getWeatherParams = (latitude: number = 43.6514, longitude: number = 6.7979): Params => {
    return {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": ["temperature_2m", "precipitation_probability", "rain", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "wind_speed_10m_max", "wind_gusts_10m_max"]
    }
}

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

interface WeatherData {
    hourly: {
        time: Date[],
        temperature2m: Float32Array,
        precipitationProbability: Float32Array,
        rain: Float32Array,
        windSpeed80m: Float32Array,
        windSpeed120m: Float32Array,
        windSpeed180m: Float32Array
    },
    daily: {
        time: Date[],
        weatherCode: Float32Array,
        temperature2mMax: Float32Array,
        temperature2mMin: Float32Array,
        sunrise: Float32Array,
        sunset: Float32Array,
        daylightDuration: Float32Array,
        sunshineDuration: Float32Array,
        windSpeed10mMax: Float32Array,
        windGusts10mMax: Float32Array
    }
}

interface GeoLocation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    admin3_id: number;
    admin4_id: number;
    timezone: string;
    population: number;
    postcodes: string[];
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
    admin3: string;
    admin4: string;
}

interface GetGeoLocationResponse {
    results: GeoLocation[];
}

type WeatherDataType = WeatherData | null

export interface GeneratedTask {
    title: string,
    task: string,
    notes: string
}

export interface State {
    user: UserWithImage | null,
    users: UserWithImage[],
    pin: string,
    weatherData: WeatherDataType,
    geolocationData: GetGeoLocationResponse | null,
    selectedGeolocationData: GeoLocation | null,
    view: View,
    adminView: AdminView,
    theme: THEME,
    status: Status | null,
    notes: Note[],
    taskData: Task[],
    hintData: Hint[],
    filters: {
        searchInput: string,
        dropdown: keyof Task,
        selectedUserFilterId: number | null
    },
    selectedAdminUserId: number | null,
    images: Image[],
    showSettingPopup: boolean,
    generatedTask: GeneratedTask
}

export const initialState : State = {
    users: [],
    user: null,
    pin: "",
    weatherData: null,
    geolocationData: null,
    selectedGeolocationData: null,
    view: View.HOME,
    adminView: AdminView.TASKS,
    theme: THEME.LIGHT,
    status: null,
    notes: [],
    taskData: [],
    hintData: [],
    filters: {
        searchInput: "",
        dropdown: "task",
        selectedUserFilterId: null
    },
    selectedAdminUserId: null,
    images: [],
    showSettingPopup: false,
    generatedTask: {
        task: "",
        title: "",
        notes: ""
    }
}

export const stateSlice = createSlice({
    name: 'state',
    initialState: initialState,
    reducers: {
        action: (state, action: PayloadAction<Partial<State>>) => {
            return {...state, ...action.payload}
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getGeolocationData.fulfilled, (state, action) => {
            state.geolocationData = action.payload
        })

        builder.addCase(getWeatherData.fulfilled, (state, action) => {

            const response = action.payload[0];

            if (response) {
                const utcOffsetSeconds = response.utcOffsetSeconds();
                const timezone = response.timezone();
                const timezoneAbbreviation = response.timezoneAbbreviation();
                const latitude = response.latitude();
                const longitude = response.longitude();

                const hourly = response.hourly()!;
                const daily = response.daily()!;

                state.weatherData = {

                    hourly: {
                        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                            (t) => new Date((t + utcOffsetSeconds) * 1000)
                        ),
                        temperature2m: hourly.variables(0)!.valuesArray()!,
                        precipitationProbability: hourly.variables(1)!.valuesArray()!,
                        rain: hourly.variables(2)!.valuesArray()!,
                        windSpeed80m: hourly.variables(3)!.valuesArray()!,
                        windSpeed120m: hourly.variables(4)!.valuesArray()!,
                        windSpeed180m: hourly.variables(5)!.valuesArray()!,
                    },

                    daily: {
                        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                            (t) => new Date((t + utcOffsetSeconds) * 1000)
                        ),
                        weatherCode: daily.variables(0)!.valuesArray()!,
                        temperature2mMax: daily.variables(1)!.valuesArray()!,
                        temperature2mMin: daily.variables(2)!.valuesArray()!,
                        sunrise: daily.variables(3)!.valuesArray()!,
                        sunset: daily.variables(4)!.valuesArray()!,
                        daylightDuration: daily.variables(5)!.valuesArray()!,
                        sunshineDuration: daily.variables(6)!.valuesArray()!,
                        windSpeed10mMax: daily.variables(7)!.valuesArray()!,
                        windGusts10mMax: daily.variables(8)!.valuesArray()!,
                    },
                }
            }
        })
    }
})


export const getWeatherData = createAsyncThunk(
    'state/getWeatherData',
    (req: {latitude: number, longitude: number} | undefined) => fetchWeatherApi(url, !req ? getWeatherParams() : getWeatherParams(req.latitude, req.longitude)).then(x => x))

class API<Model extends { id: string }> extends REST<Model> {
    constructor(path: string) {
        super(path);
    }
    getGeoLocationData (query: string) {
      return this.getRequest<GetGeoLocationResponse>(geolocationUrl(query)).then(x => x)
    }
}

const api = new API(``)

export const getGeolocationData = createAsyncThunk('state/getGeolocationData', (query: string) => api.getGeoLocationData(query).then(x => x))

export const { action } = stateSlice.actions;
export const entireState = (state: State) => state;
export default stateSlice.reducer;
