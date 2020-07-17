import axios from "axios"

class api {
    constructor() { }

    // Save function
    save(instance, window) {
        instance.saving = true;
        instance.$http
            .create({ withCredentials: true })
            .post(`${instance.$api}/api/track`, instance.column)
            .then(function (response) {
                instance.saving = false;
                if (response.data.success === true) {
                    if (!instance.column._id) {
                        instance.column._id = response.data.trackid;
                    }
                    instance.$store.commit("saveTrack", {
                        column: instance.column,
                        index: instance.index
                    });
                    instance.$emit("saved", true);
                }
                else {
                    window.alert("Oops! something happened. You might offline");
                }
            })
            .catch(function (error) {
                instance.saving = false;
                console.log(error);
                window.alert("Oops! something happened. You might offline");
            });
    }

    createTrack(instance, window, status) {

        instance.track.private = (status == 'public' ? false : true)

        instance[`${status}Loading`] = true;
        instance.$http
            .create({ withCredentials: true })
            .post(`${instance.$api}/api/track`, instance.track)
            .then(function (response) {
                instance[`${status}Loading`] = false;
                instance.trackAdder = false;
                if (response.data.success === true) {
                    var track = JSON.parse(JSON.stringify(instance.track));
                    instance.track._id = response.data.trackid;
                    instance.$store.commit("createTrack", track);
                    instance.track.name = "";
                }
                else {
                    window.alert("Oops! something happened. You might offline");
                }
            })
            .catch(function (error) {
                instance[`${status}Loading`] = false;
                console.log(error);
                window.alert("Oops! something happened. You might offline");
            });
    }

}

function verify(url, store) {
    // Verify login status
    return axios.create({ withCredentials: true })
        .post(`${url}/api/login/verify`)
        .then(response => {
            if (response.data.authorized) {

                if (response.data.details.admin) {
                    store.dispatch("adminAuth")
                } else {
                    store.dispatch("adminDeAuth")
                }

                store.commit("setUserDetails", response.data.details);
                store.dispatch("auth");
                return true;

            } else {
                store.dispatch("deauth");
                return false;
            }
        })
        .catch(function (error) { // eslint-disable-line
            console.log(error)
            return false;
        })
}

function fetchTrack(instance) {
    return axios.create({ withCredentials: true })
        .get(`${instance.$api}/api/track/single`, {
            params: {
                id: instance.$route.query.id
            }
        })
        .then(response => {
            console.log(response)
            if (response.data.success) {
                instance.$store.commit("updatePublicTrack", response.data.result.track);
                return true;
            } else {
                return false;
            }
        })
        .catch(function (error) { // eslint-disable-line
            console.log(error)
            return false;
        })
}

function fetchAllTracks() {

}

export default new api;

export { verify, fetchTrack, fetchAllTracks }
