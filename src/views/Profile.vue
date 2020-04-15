<template>
  <v-container>
    <v-row no-gutters justify="space-around">
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
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-avatar class="profile mt-4" color="grey" size="150">
                      <v-img src="@/assets/profile/profile.jpg"></v-img>
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="#036358">
                          <!-- Implement picture upload -->
                          <v-btn fab text>
                            <v-icon>mdi-image-edit</v-icon>
                          </v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-avatar>
                  </template>
                </v-hover>

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
export default {
  data() {
    return {
      self: this.$store.state.self,
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
        .post("http://localhost:5443/api/update", {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  border-radius: 1.5%;
}
</style>
