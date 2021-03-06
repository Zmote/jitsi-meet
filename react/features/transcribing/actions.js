// @flow

import {
    _DIAL_ERROR,
    _POTENTIAL_TRANSCRIBER_JOINED,
    _TRANSCRIBER_JOINED,
    _TRANSCRIBER_LEFT,
    DIAL_TRANSCRIBER,
    SET_PENDING_TRANSCRIBING_NOTIFICATION_UID,
    STOP_TRANSCRIBING
} from './actionTypes';
import {
    hideNotification,
    showErrorNotification,
    showNotification
} from '../notifications';

/**
 * Dial the transcriber into the room.
 *
 * @public
 * @returns {{
 *     type: DIAL_TRANSCRIBER
 * }}
 */
export function dialTranscriber() {
    return {
        type: DIAL_TRANSCRIBER
    };
}

/**
 * Stop the transcribing by kicking the transcriber participant.
 *
 * @returns {{
 *     type: STOP_TRANSCRIBING
 * }}
 */
export function stopTranscribing() {
    return {
        type: STOP_TRANSCRIBING
    };
}

/**
 * Notify that the transcriber, with a unique ID, has joined.
 *
 * @param {string} participantId - The participant id of the transcriber.
 * @returns {{
 *     type: _TRANSCRIBER_JOINED,
 *     participantId: string
 * }}
 */
export function transcriberJoined(participantId: string) {
    return {
        type: _TRANSCRIBER_JOINED,
        transcriberJID: participantId
    };
}

/**
 * Notify that the transcriber, with a unique ID, has left.
 *
 * @param {string} participantId - The participant id of the transcriber.
 * @returns {{
 *     type: _TRANSCRIBER_LEFT,
 *     participantId: string
 * }}
 */
export function transcriberLeft(participantId: string) {
    return {
        type: _TRANSCRIBER_LEFT,
        transcriberJID: participantId
    };
}

/**
 * Notify that a potential transcriber, with a unique ID, has joined.
 *
 * @param {string} participantId - The participant id of the transcriber.
 * @returns {{
 *     type: _POTENTIAL_TRANSCRIBER_JOINED,
 *     participantId: string
 * }}
 */
export function potentialTranscriberJoined(participantId: string) {
    return {
        type: _POTENTIAL_TRANSCRIBER_JOINED,
        transcriberJID: participantId
    };
}

/**
 * Notify that dialing the transcriber resulted in an error.
 *
 * @returns {{
 *      type: _DIAL_ERROR
 * }}
 */
export function dialError() {
    return {
        type: _DIAL_ERROR
    };
}

/**
 * Signals that the pending transcribing notification should be shown on the
 * screen.
 *
 * @returns {Function}
 */
export function showPendingTranscribingNotification() {
    return (dispatch: Function) => {
        const showNotificationAction = showNotification({
            descriptionKey: 'transcribing.pending',
            isDismissAllowed: false,
            titleKey: 'dialog.transcribing'
        });

        dispatch(showNotificationAction);

        dispatch(setPendingTranscribingNotificationUid(
            showNotificationAction.uid));
    };
}

/**
 * Sets UID of the the pending transcribing notification to use it when hiding
 * the notification is necessary, or unsets it when undefined (or no param) is
 * passed.
 *
 * @param {?number} uid - The UID of the notification.
 * @returns {{
 *     type: SET_PENDING_TRANSCRIBING_NOTIFICATION_UID,
 *     uid: number
 * }}
 */
export function setPendingTranscribingNotificationUid(uid: ?number) {
    return {
        type: SET_PENDING_TRANSCRIBING_NOTIFICATION_UID,
        uid
    };
}

/**
 * Signals that the pending transcribing notification should be removed from the
 * screen.
 *
 * @returns {Function}
 */
export function hidePendingTranscribingNotification() {
    return (dispatch: Function, getState: Function) => {
        const { pendingNotificationUid } = getState()['features/transcribing'];

        if (pendingNotificationUid) {
            dispatch(hideNotification(pendingNotificationUid));
            dispatch(setPendingTranscribingNotificationUid());
        }
    };
}

/**
 * Signals that the stopped transcribing notification should be shown on the
 * screen for a 2500 ms.
 *
 * @returns {showNotification}
 */
export function showStoppedTranscribingNotification() {
    return showNotification({
        descriptionKey: 'transcribing.off',
        titleKey: 'dialog.transcribing'
    }, 2500);
}


/**
 * Signals that the transcribing error notification should be shown.
 *
 * @returns {showErrorNotification}
 */
export function showTranscribingError() {
    return showErrorNotification({
        descriptionKey: 'transcribing.error',
        titleKey: 'transcribing.failedToStart'
    });
}
