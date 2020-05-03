<template>
  <v-container>
    <v-row no-gutters justify="space-around">
      <v-dialog max-width="400" v-model="uploadDialog">
        <!-- <file-pond
            class="filepond"
            ref="pond"
            labelButtonRemoveItem
            label-idle="Drop image here..."
            accepted-file-types="image/jpeg, image/png"
            multiple
            data-max-file-size="3MB"
            v-bind:files="myFiles"
            v-on:init="handleFilePondInit"
            v-on:addfile="handleFilePondAddFile"
        />-->

        <file-pond
          type="file"
          class="filepond"
          name="filepond"
          data-max-file-size="3MB"
          ref="pond"
          label-idle="Drop image here..."
          accepted-file-types="image/jpeg, image/png"
          v-bind:server="myServer"
          v-bind:files="myFiles"
          v-on:init="handleFilePondInit"
        />
      </v-dialog>

      <!-- User details -->
      <v-col cols="12" sm="12" md="7" class="pa-0 mt-4 mb-2">
        <v-card class="px-3" shaped>
          <v-form v-model="valid">
            <v-col>
              <!-- Profile edit -->
              <v-row>
                <v-card-subtitle class="font-weight-medium">Edit profile</v-card-subtitle>
              </v-row>

              <!-- First row names -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="20"
                    required
                    outlined
                    dense
                    append-icon="mdi-account-box-outline"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="username"
                    :counter="15"
                    label="Username"
                    required
                    outlined
                    disabled
                    dense
                    append-icon="mdi-account-card-details-outline"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Second row E mail -->
              <v-row justify="center">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    outlined
                    dense
                    append-icon="mdi-email-outline"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="phone" required outlined dense append-icon="mdi-cellphone"></v-text-field>
                </v-col>
              </v-row>

              <!-- Text area -->
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-textarea label="About" v-model="about" outlined background-color></v-textarea>
                </v-col>
              </v-row>

              <!-- Error dialog -->
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Oops !!!</v-card-title>

                  <v-card-text>Something happened. You can try again or report the issue.</v-card-text>

                  <v-row no-gutters justify="center">
                    <v-card-actions>
                      <v-btn color="red darken-1" text @click="dialog = false">Report</v-btn>
                    </v-card-actions>
                  </v-row>
                </v-card>
              </v-dialog>

              <v-divider></v-divider>

              <!-- Save button -->
              <v-row>
                <v-col class="mt-2" align="center">
                  <v-btn
                    :loading="loading"
                    :color="success ? 'success' : 'primary'"
                    @click="success ? null : save()"
                  >
                    <v-icon
                      left
                    >{{ success ? 'mdi-checkbox-marked-circle-outline' : 'mdi-content-save' }}</v-icon>
                    {{ success ? 'saved' : 'save' }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-form>
        </v-card>
      </v-col>

      <!-- Profile section -->
      <v-col cols="12" sm="6" md="4" class="pa-0 mt-4 mb-2">
        <v-card>
          <v-row no-gutters>
            <v-col align="center">
              <v-img src="@/assets/back.png" alt="profile image" class="img" max-height="550">
                <!-- Profile with hover effect -->

                <!-- Edit picture menu -->
                <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
                  <template v-slot:activator="{ on }">
                    <!-- Picture with hove effect -->
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <!-- Main picture avatar -->
                        <v-avatar
                          v-on="on"
                          class="profile mt-4"
                          color="#212121"
                          size="150"
                          @click="log()"
                        >
                          <v-img :src="self.avatar"></v-img>

                          <!-- Fad transition and button -->
                          <v-fade-transition>
                            <v-overlay v-if="hover" absolute color="#036358">
                              <!-- Implement picture upload -->
                              <v-btn x-large fab text>
                                <v-icon>mdi-image-edit</v-icon>
                              </v-btn>
                            </v-overlay>
                          </v-fade-transition>
                        </v-avatar>
                      </template>
                    </v-hover>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      @click="action(item.title)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-card-subtitle class="pb-0 title">{{ name }}</v-card-subtitle>

                <v-card-subtitle class="pt-1 subtitle-1">@{{ username }}</v-card-subtitle>
                <v-card-text>{{ about }}</v-card-text>
              </v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Import FilePond
import vueFilePond from "vue-filepond";

// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";

// Import styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "Profile",

  metaInfo: {
    title: "Personal profile",
    titleTemplate: "%s | Weskool learning path sharing",
    meta: [
      { charset: "utf-8" },
      { name: "description", content: "Weskool Login" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },

  components: {
    FilePond
  },

  data() {
    return {
      self: this.$store.state.self,
      myServer: {
        load: (source, load, error) => {
          var myRequest = new Request(source);
          fetch(myRequest)
            .then(function(response) {
              response.blob().then(function(myBlob) {
                load(myBlob);
              });
            })
            .catch(e => {
              error(e);
            });
        },
        process: (fieldName, file, metadata, load, error, progress) => {
          // set data
          const formData = new FormData();
          formData.append("file", file, file.name);

          // related to aborting the request
          const CancelToken = this.$http.CancelToken;
          const source = CancelToken.source();

          // the request itself
          this.$http({
            method: "post",
            url: `${this.$uploads}/upload` + "?" + (new URLSearchParams({profile: true})).toString(),
            data: formData,
            withCredentials: true,
            cancelToken: source.token,
            onUploadProgress: e => {
              // updating progress indicator
              progress(e.lengthComputable, e.loaded, e.total);
            }
          })
            .then(response => {
              // passing the file id to FilePond
              load(response.data.image);
              this.updateImage(response.data.url);
            })
            .catch(thrown => {
              if (this.$http.isCancel(thrown)) {
                console.log("Request canceled", thrown.message);
              } else {
                // handle error
              }
            });

          // Setup abort interface
          return {
            abort: () => {
              source.cancel("Operation canceled by the user.");
            }
          };
        },
        revert: (uniqueField, load, error) => {
          this.$http({
            method: "delete",
            url: `${this.$uploads}/delete` + "?" + (new URLSearchParams({profile: true})).toString(),
            data: { file: uniqueField },
            withCredentials: true
          })
            .then(response => {
              if (response.data.success === true) {
                console.log("Success");
                this.updateImage("https://weskool.team:7443/images/social.svg")
                // Should call the load method when done, no parameters required
                load();
              }
            })
            .catch(e => {
              // Can call the error method if something is wrong, should exit after
              error("oh my goodness: " + e);
            });
        }
      },
      viewPicture: false,
      myFiles: [
        {
          // the server file reference
          source: this.$store.state.self.avatar,

          // set type to local to indicate an already uploaded file
          options: {
            type: "local"
          }
        }
      ],
      showMenu: false,
      items: [{ title: "Edit" }, { title: "View" }],
      uploadDialog: false,
      dialog: false,
      hover: false,
      valid: false,
      loading: false,
      success: false,
      name: JSON.parse(JSON.stringify(this.$store.state.self.name)),
      username: JSON.parse(JSON.stringify(this.$store.state.self.username)),
      about:
        "Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is",
      email: JSON.parse(JSON.stringify(this.$store.state.self.email)),
      phone: "0711222333",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    save() {
      this.loading = true;
      var instance = this;
      var fields = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        about: this.about
      };
      this.$http
        .create({ withCredentials: true })
        .post(`${this.$api}/api/update`, {
          fields: fields
        })
        .then(
          res => {
            instance.loading = false;
            if (res.data.success) {
              instance.$store.commit("updateProfile", fields);
              instance.success = true;
              setTimeout(function() {
                instance.success = false;
              }, 3000);
            } else {
              instance.loading = false;
              instance.dialog = true;
            }
          },
          err => {
            this.loading = false;
            this.dialog = true;
            console.log(err);
          }
        );
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },
    action(option) {
      if (option === "Edit") {
        this.uploadDialog = true;
      } else if (option === "View") {
        this.viewPicture = true;
      }
    },
    updateImage(url){
      this.$store.commit("updateProfileImage", url)
    },
    log() {
      
    }
  },

  created() {
    // console.log(this.self.avatar)
  }
};
</script>

<style lang="scss" scoped>
.filepond--drop-label {
  color: #4c4e53;
}

.img {
  border-radius: 1.5%;
}
</style>
