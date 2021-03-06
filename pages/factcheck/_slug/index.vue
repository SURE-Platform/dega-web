<template>
  <div class="main-content">
    <div
      v-for="(f, i) in factchecks"
      ref="factchecks"
      :key="i"
      class="columns">
      <div class="column is-8">
        <div>
          <StoryHead :story="f"/>
        </div>
        <div class="margin-top-2">
          <article
            class="has-text-justify factcheck-intro-font"
            v-html="f.introduction" />
          <br>
          <div
            v-for="(claim,index) in f.claims"
            :key="index"
            :id="'claim-div-'+index">
            <a
              :id="'claim'+(index)"
              class="anchor"/>
            <Claim
              :claim="claim"
              :index="index"/>
          </div>
          <article
            class="has-text-justify factcheck-summary-font"
            v-html="f.summary" />
        </div>
        <div class="margin-top-2">
          <StoryFooter
            :tags="f.tags"
            :updates="f.updates"
          />
        </div>
      </div>
      <div class="column is-4">
        <div>
          <div v-if="f.claims.length > 0">
            <ListClaims
              v-if="f.claims.length > 1"
              :claims="f.claims" />
          </div>
          <div v-if="f.categories.length > 0">
            <RelatedArticle
              v-for="(category, index) in f.categories"
              :key="'user-related'+index"
              :slug="category.slug"
              :header="`More in ${category.name}`"
              :id="f.id"
              class="margin-horizontal-1"
              collection="category"
            />
          </div>
          <div v-if="f.users.length > 0">
            <RelatedArticle
              v-for="(user, index) in f.users"
              :key="'user-related'+index"
              :slug="user.slug"
              :header="`More from ${user.displayName}`"
              :id="f.id"
              class="margin-horizontal-1"
              collection="user"
            />
          </div>
        </div>
      </div>
    </div>
    <SocialSharingVertical
      :url="'/factcheck/'+factchecks[on].slug"
      :quote="factchecks[on].title"
      :id="factchecks[on].id"
      type="factcheck"
    />
  </div>
</template>
<style>
a.anchor {
    display: block;
    position: relative;
    top: -80px;
}
</style>
<script>
import StoryHead from '@/components/StoryHead';
import StoryFooter from '@/components/StoryFooter';
import Claim from '@/components/Claim';
import ListClaims from '@/components/ListClaims';
import RelatedArticle from '@/components/RelatedArticle';

export default {
  components: {
    StoryHead,
    StoryFooter,
    Claim,
    ListClaims,
    RelatedArticle
  },
  data() {
    return {
      factchecks: [],
      on: 0,
      pagination: {
        hasNext: true,
        next: ''
      }
    };
  },
  validate({ params }) {
    return params.slug;
  },
  watch: {
    on() {
      document.title = `${this.factchecks[this.on].title} - ${this.$store.getters.getOrganisation.siteTitle}`;
      // eslint-disable-next-line no-restricted-globals
      history.pushState({}, null, `/factcheck/${this.factchecks[this.on].slug}`);
    }
  },
  mounted() {
    this.scroll();
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        const scrolling = document.documentElement.scrollTop + window.innerHeight;
        const bottomOfWindow = scrolling + 50 >= document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (this.pagination.hasNext) this.getLatestFactchecks();
        }

        const factchecksList = this.$refs.factchecks;
        for (let i = 0; i < factchecksList.length; i += 1) {
          const top = factchecksList[i].offsetTop;
          const bottom = top + factchecksList[i].clientHeight;
          if (scrolling >= top && scrolling < bottom) {
            if (this.on !== i) {
              this.on = i;
            }
          }
        }
      };
    },
    async getLatestFactchecks() {
      await this.$axios
        .$get(`/api/v1/factchecks/?sortBy=publishedDate&sortAsc=false&limit=1&next=${this.pagination.next}`)
        .then((response) => {
          const latestFactcheck = response.data;
          this.pagination = response.paging;
          if (this.factchecks.find(value => value.id === latestFactcheck[0].id)) {
            console.log('Already there');
          } else this.factchecks = this.factchecks.concat(latestFactcheck);
        });
    }
  },
  async asyncData({
    params, error, $axios
  }) {
    return $axios.$get(`/api/v1/factchecks/${params.slug}`)
      .then(factcheck => ({ factchecks: factcheck.data ? [factcheck.data] : [] }))
      .catch(() => error({ code: 404, message: 'You have been lost', homepage: true }));
  },
  head() {
    const metadata = {};
    const { factchecks } = this;
    if (factchecks.length > 0) {
      metadata.title = `${factchecks[0].title} - ${this.$store.getters.getOrganisation.siteTitle}`;
      metadata.script = [
        { innerHTML: JSON.stringify(factchecks[0].schemas), type: 'application/ld+json' },
        { src: 'https://platform.twitter.com/widgets.js', async: true },
      ];
      metadata.meta = [
        { hid: 'og:title', name: 'og:title', content: `${factchecks[0].title} - ${this.$store.getters.getOrganisation.siteTitle}` },
        { hid: 'og:image', name: 'og:image', content: factchecks[0].media ? factchecks[0].media.sourceURL : null },
        { hid: 'og:description', name: 'og:description', content: factchecks[0].excerpt ? factchecks[0].excerpt : null },
      ];
    } else { metadata.title = this.$store.getters.getOrganisation.siteTitle; }

    return metadata;
  }
};
</script>
