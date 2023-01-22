<template>
  <div>
    <!-- If auth configured, show status text -->
    <span class="user-type-note">{{ makeUserGreeting() }}</span>
    <div class="display-options">
      <!-- If user logged in, show logout button -->
      <IconLogout
        v-if="userType == userStateEnum.loggedIn"
        v-tooltip="tooltip($t('settings.sign-out-tooltip'))"
        class="layout-icon"
        tabindex="-2"
        @click="logout()"
      />
      <!-- If not logged in, and guest mode enabled, show login button -->
      <IconLogout
        v-if="userType == userStateEnum.guestAccess"
        v-tooltip="tooltip($t('settings.sign-in-tooltip'))"
        class="layout-icon"
        tabindex="-2"
        @click="goToLogin()"
      />
      <!-- If user logged in via keycloak, show keycloak logout button -->
      <IconLogout
        v-if="userType == userStateEnum.keycloakEnabled"
        v-tooltip="tooltip($t('settings.sign-out-tooltip'))"
        class="layout-icon"
        tabindex="-2"
        @click="keycloakLogout()"
      />
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { logout as registerLogout } from '@/utils/Auth';
import { getKeycloakAuth } from '@/utils/KeycloakAuth';
import { localStorageKeys, userStateEnum } from '@/utils/defaults';
import IconLogout from '@/assets/interface-icons/user-logout.svg';

export default {
  name: 'AuthButtons',
  components: {
    IconLogout,
  },
  props: {
    userType: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      userStateEnum,
    };
  },
  methods: {
    logout() {
      registerLogout();
      this.$toasted.show(this.$t('login.logout-message'));
      setTimeout(() => {
        router.push({ path: '/login' });
      }, 500);
    },
    keycloakLogout() {
      const keycloak = getKeycloakAuth();
      this.$toasted.show(this.$t('login.logout-message'));
      setTimeout(() => {
        keycloak.logout();
      }, 500);
    },
    goToLogin() {
      router.push({ path: '/login' });
    },
    tooltip(content) {
      return { content, trigger: 'hover focus', delay: 250 };
    },
    makeUserGreeting() {
      if (
        this.userType === userStateEnum.loggedIn ||
        this.userType === userStateEnum.keycloakEnabled
      ) {
        const username = localStorage[localStorageKeys.USERNAME];
        return username ? this.$t('settings.sign-in-welcome', { username }) : '';
      }
      if (this.userType === userStateEnum.guestAccess) {
        return this.$t('settings.sign-in-tooltip');
      }
      return '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/style-helpers';

span.user-type-note {
  color: var(--settings-text-color);
  margin-right: 0.5rem;
}

.display-options {
  @extend .svg-button;

  color: var(--settings-text-color);
}
</style>
