<template>
  <div class="main-content">
    <Hero :story="stories[0]" />
    <hr class="spacer is-1-5 is-hidden-mobile">
    <div class="columns">
      <div class="column is-8">
        <div>
          <StoryPreview
            v-for="(p, index) in stories.slice(1)"
            :key="index"
            :story="p"
          />
        </div>
        <div
          v-if="stories.length > 0 && !pagination.hasNext"
          class="margin-top-2">
          <h3 class="is-size-4 has-text-centered">No more stories</h3>
        </div>
      </div>
      <div class="column is-4">
        <div class="is-hidden-mobile">
          <RelatedArticle
            slug="video"
            header="Recent Videos"
            collection="category"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoryPreview from '@/components/StoryPreview';
import Hero from '@/components/Hero';
import RelatedArticle from '@/components/RelatedArticle';

export default {
  components: {
    StoryPreview,
    Hero,
    RelatedArticle
  },
  data() {
    return {
      stories: [],
      pagination: {}
    };
  },
  mounted() {
    this.scroll();
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow && this.pagination.hasNext) {
          this.getStories();
        }
      };
    },
    getStories() {
      if (this.pagination.hasNext) {
        this.$axios
          .$get(`/api/v1/factchecks/?sortBy=publishedDate&sortAsc=false&next=${this.pagination.next}&limit=5`)
          .then((response) => {
            this.stories = (this.stories || []).concat(response.data || []);
            this.pagination = response.paging;
          });
      }
    }
  },
  async asyncData({ error, $axios }) {
    return $axios.$get('/api/v1/factchecks/?sortBy=publishedDate&sortAsc=false&limit=5')
      .then(({ data, paging }) => {
        if (data.length === 0) {
          error({ code: 404, message: 'You have been lost', homepage: true });
        }

        return {
          stories: data,
          pagination: paging
        };
      });
  },
  head() {
    const title = `Factchecks - ${this.$store.getters.getOrganisation.siteTitle}`;
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ]
    };
  }
};
</script>
