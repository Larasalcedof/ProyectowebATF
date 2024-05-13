export interface RentSolicitudeSetStatusRequest {
    id: number
    status: RentSolicitudeStatus;
}

export type RentSolicitudeStatus =
    "TO_BE_ACCEPTED" |
    "ACCEPTED" |
    "PAID" |
    "TO_BE_QUALIFIED" |
    "REJECTED" |
    "FINALIZED"