<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="mx-auto" width="420" height="520">
      <!-- Banner -->
      <v-toolbar color="primary" dark flat class="d-flex justify-center mb-4">
        <v-toolbar-title>WESKOOL</v-toolbar-title>
      </v-toolbar>

      <v-row no-gutters class="px-6 py-6">
        <!-- Username -->
        <v-col cols="12">
          <v-text-field label="Username" outlined prepend-inner-icon="mdi-account"></v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12" :class=" signup ? 'email' : 'emailhide' ">
          <v-text-field label="email" outlined type="email" prepend-inner-icon="mdi-email"></v-text-field>
        </v-col>

        <!-- Password -->
        <v-col cols="12" :class="signup ? 'move' : 'moveback'">
          <v-text-field
            label="Password"
            outlined
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-inner-icon="mdi-lock"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
        </v-col>

        <!-- remember me -->
        <v-col cols="6" :class="signup ? 'move' : 'moveback'">
          <v-checkbox v-model="custom" label="Remember me" class="pa-0 ma-0 pt-2"></v-checkbox>
        </v-col>

        <!-- Password -->
        <v-col cols="6" align="right" :class="signup ? 'move' : 'moveback'">
          <p class="pa-0 ma-0 pt-2">
            <a href="#">Forgot password</a>
          </p>
        </v-col>

        <!-- Sign in button -->
        <v-col cols="6" align="start" class="py-4">
          <v-btn
            :class=" signup ? 'move login' : 'moveback login' "
            rounded
            :color="signup ? 'grey' : 'blue'"
            @click=" signup ? signup = false : login() "
          >Sign In</v-btn>
        </v-col>

        <!-- Signup button -->
        <v-col cols="6" align="end" class="py-4 register">
          <v-btn
            :class="signup ? 'move register' : 'moveback register'"
            rounded
            :color="signup ? 'blue' : 'grey' "
            @click=" signup ? '' : signup = true "
          >Sign Up</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      custom: true,
      signup: false,
      password: "",
      show: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },

  methods: {
    login() {
      // Solves problem of invalid csrf token using: withCredentials: true
      axios.create({withCredentials: true}).post("http://localhost:5443/api/login")
    }
  },

  created() {
    // Solves problem of invalid csrf token using: withCredentials: true
    axios.create({withCredentials: true}).get("http://localhost:5443/api/access").then(
      response => {
        console.log(response)
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>


<style lang="scss" scoped>
$move: 0.65s;

.login,
.register {
  -webkit-transition: background-color 1s;
  -ms-transition: background-color 1s;
  transition: background-color 1s;
}

.email {
  opacity: 1;
  transition: all $move ease-in-out;
  transition-delay: 0.3s;
}

.emailhide {
  opacity: 0;
  transition: all $move ease-in-out;
}

.moveback {
  transform: translateY(-85px);
  transition: all $move ease-in-out;
}

.move {
  transition: all $move ease-in-out;
}
</style>
