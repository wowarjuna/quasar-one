<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-sm">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newQweetContent"
            placeholder="What's happening"
            counter
            maxlength="280"
            autogrow
            class="new-qweet"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            :disabled="!newQweetContent"
            no-caps
            unelevated
            rounded
            color="primary"
            label="Qweet"
            class="q-mb-lg"
          />
        </div>
      </div>
      <q-separator size="10px" color="grey-2" class="divider" />
      <q-list>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            v-for="qweet in qweets"
            :key="qweet.date"
            class="qweet q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1"
                ><strong> Brunch this weekend?</strong>
                <span class="text-grey-7">@wowarjuna</span>
                <br class="lt-md" />&bull;{{
                  qweet.date | relativeDate
                }}</q-item-label
              >

              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="row justify-between q-mt-sm qweet-icons">
                <q-btn flat round color="grey" icon="fa fa-comment" size="sm" />
                <q-btn flat round color="grey" icon="fa fa-retweet" size="sm" />
                <q-btn flat round color="grey" icon="fa fa-heart" size="sm" />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fa fa-trash"
                  size="sm"
                  @click="deleteQweet(qweet)"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from "date-fns";
import db from "src/boot/firebase";
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        {
          content: "Lorem ipsum dolor sit amet, consectetur",
          date: 1615287005810
        },
        {
          content: "Lorem ipsum dolor sit amet, consectetur",
          date: 1615287005811
        },
        {
          content: "Lorem ipsum dolor sit amet, consectetur",
          date: 1615287005812
        }
      ]
    };
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now()
      };

      // this.qweets.unshift(newQweet);
      db.collection("qweets")
        .add(newQweet)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      this.newQweetContent = "";
    },
    deleteQweet(qweet) {
      let dateToDelete = qweet.date;
      let index = this.qweets.indexOf(_ => _.date === dateToDelete);
      this.qweets.splice(index, 1);
    }
  },
  mounted() {
    db.collection("qweets")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            this.qweets.unshift(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
  }
};
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top:1px solid
  border-bottom:1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
.qweet:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)
</style>
