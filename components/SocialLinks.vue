<template>
  <div
    :class="way === 'vertical' ? 'is-grouped': ''"
    class="field">
    <div
      v-if="organisation.facebookURL"
      class="control">
      <a
        :href="organisation.facebookURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon facebook-color">
          <i class="mdi mdi-facebook"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Facebook
        </span>
      </a>
    </div>
    <div
      v-if="organisation.twitterURL"
      class="control">
      <a
        :href="organisation.twitterURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon twitter-color">
          <i class="mdi mdi-twitter"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Twitter
        </span>
      </a>
    </div>
    <div
      v-if="organisation.youTubeURL"
      class="control">
      <a
        :href="organisation.youTubeURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon youtube-color">
          <i class="mdi mdi-youtube"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Youtube
        </span>
      </a>
    </div>
    <div
      v-if="organisation.githubURL"
      class="control">
      <a
        :href="organisation.githubURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon github-color">
          <i class="mdi mdi-github-circle"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Github
        </span>
      </a>
    </div>
    <div
      v-if="organisation.tumblerURL"
      class="control">
      <a
        :href="organisation.tumblerURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon tunbler-color">
          <i class="mdi mdi-tumblr"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Tumbler
        </span>
      </a>
    </div>
    <div
      v-if="organisation.pinterestURL"
      class="control">
      <a
        :href="organisation.pinterestURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon pinterest-color">
          <i class="mdi mdi-pinterest"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Pinterest
        </span>
      </a>
    </div>
    <div
      v-if="organisation.linkedInURL"
      class="control">
      <a
        :href="organisation.linkedInURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon linkedin-color">
          <i class="mdi mdi-linkedin"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Linkedin
        </span>
      </a>
    </div>
    <div
      v-if="organisation.whatsappURL"
      class="control">
      <a
        :href="organisation.whatsappURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon whatsapp-color">
          <i class="mdi mdi-whatsapp"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Whatsapp
        </span>
      </a>
    </div>
    <div
      v-if="organisation.instagramURL"
      class="control">
      <a
        :href="organisation.instagramURL"
        target="_blank"
      >
        <span
          :class="icon_size"
          class="icon instagram-color">
          <i class="mdi mdi-instagram"/>
        </span>
        <span
          v-if="name"
          class="is-size-6 has-text-black">
          Instagram
        </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
      type: Object,
      required: true
    },
    way: {
      type: String,
      default: 'vertical'
    },
    name: {
      type: Boolean,
      default: false
    },
    icon_size: {
      type: String,
      default: 'is-size-4'
    }
  }
};
</script>
