<template>

    <div>

        <b-container>

        <b-row>

        <b-col>

        <b-jumbotron header="file_chooser" lead="Teile deine MedAT-Materialien mit DropBox.">
        <p>Für diesen Schritt benötigst du einen <a href="https://www.dropbox.com/" alt="DropBox Account Anlegen" target="_BLANK">DropBox-Account</a>.</p>
        <b-button id="tooltip-target-1" variant="primary" href="#" @click="dropboxIconClicked()">DropBox-Dateien Wählen</b-button>
        <p class="mt-3"><i>Mit dem Upload willigst du den unten angeführten <a href="#contract" alt="Vereinbarungen"><b>Vereinbarungen</b></a> ein. </i></p> 

        <b-tooltip target="tooltip-target-1" triggers="hover">
            Auswählbar sind ".pdf",  ".doc", ".docx" Dateien.
        </b-tooltip>

        <ul class="list-group space">
            <li v-for="item in tempAttachments" class="list-group-item disabled">{{ item.title }} <span class="small_print">{{ item.link }}</span></li>

            <b-button v-if="tempAttachments.length" id="" variant="primary" href="#" @click="saveButtonClicked()" class="space">Auswahl Speichern</b-button>   
        </ul>

        </b-jumbotron>

        <b-alert class="alert alert-dark" show>Nachdem deine Materialien von der Redaktion geprüft wurden und bereit zur Veröffentlichung sind, erhältst du eine Einladung in die <b>Tafelrunde</b>, an deine Anmeldungs-Emailadresse zugeschickt.</b-alert>

        <b-alert show>Bitte per DropBox Materialien auswählen und speichern</b-alert>

        <b-alert variant="success" v-model="showAlert">Auswahl gespeichert! Bitte Profil hinzufügen nicht vergessen, wenn Du in der Tafelrunde gefeaturest werden möchtest</b-alert>

        <b-alert variant="warning" v-model="showErrAlert">Auswahl nicht gespeichert! Bitte überprüfe, dass du keine Eingaben doppelt gemacht hast. Gegebenenfalls Seite neu laden</b-alert>

        </b-col>

        </b-row>

        <b-row>

            <b-col>
                <ul v-if="attachments.length" class="list-group space">
                    <h2 class="space">Bereits Gespeicherte Links</h2>
                    <li v-for="item in attachments" class="list-group-item disabled">{{ item.title }} <span class="small_print">{{ item.link }}</span></li>
                </ul>
            </b-col>

            <b-col>

                <img src="/static/img/filechooser_logo-01.png" alt="medKnights file_chooser" width="570" height="483"/>

            </b-col>

        </b-row>

        </b-container>
        
    </div>

</template>

<script>

import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const API_BASE = 'http://127.0.0.1:8000/'

const API_URL_DROPBOX_LINKS = API_BASE + 'dropbox_links'
const API_URL_USER_INFO = API_BASE + 'accounts'

export default {
    name: 'fileChooser',
    mounted() {
        let dropBox = document.createElement("script");
        dropBox.setAttribute(
        "src",
        "https://www.dropbox.com/static/api/2/dropins.js"
        );
        dropBox.setAttribute("id", "dropboxjs");
        dropBox.setAttribute("data-app-key", "55ipjhikd0zgi9c");
        document.head.appendChild(dropBox);

        axios.get(API_URL_DROPBOX_LINKS)
            .then(response => {
                this.attachments = response.data

                /*if (this.attachments.length) {
                    this.user = this.attachments[0].user;
                } else {

                    getUser();

                }*/

            });

        axios.get(API_URL_USER_INFO)
            .then(response => {
                
                this.user = response.data[0].username;

            });
    },
    data: function () {
        return {
            tempAttachments: [],
            attachments: [],
            showAlert: false,
            showErrAlert: false,
            user: "",
        }
    },
    methods: {
        dropboxIconClicked() {
            let options = {
                success: async files => {
                    let attachments = [];
                    for (let i = 0; i < files.length; i++) {
                        let attachment = {};
                        attachment._id = files[i].id;
                        attachment.title = files[i].name;
                        attachment.size = files[i].bytes;
                        attachment.iconURL = files[i].icon;
                        attachment.link = files[i].link;
                        attachment.extension = `. ${files[i].name.split(".")[1]}`;
                        attachments.push(attachment);
                    }
                this.tempAttachments = attachments;
                console.log(this.tempAttachments);
                },

                cancel: function() {},

                linkType: "preview",

                multiselect: true,

                extensions: [
                ".pdf",
                ".doc",
                ".docx",
                ],

                folderselect: false,

                sizeLimit: 102400000
            };
            
            Dropbox.choose(options);
        },
        saveButtonClicked() {

            let promises = [];

            let _this = this;

            this.tempAttachments.forEach(function (singleElement) {
                
                /*console.log(singleElement.link);*/

                promises.push(axios.post(API_URL_DROPBOX_LINKS, {
                    "title": singleElement.title,
                    "user": _this.user, 
                    "link": singleElement.link,
                    "used": false
                }));

                
            });

            /*console.log(promises);*/

            Promise.all(promises).then(function (res) {

                res.forEach(function (response) {
                    console.log(response); /* put confirmation here, or outside for each */
                });

                _this.showAlert = true;

            }, function (reason) {

                _this.showErrAlert = true;

            });

            /*this.showAlert = true;*/

        }
    }
}
</script>