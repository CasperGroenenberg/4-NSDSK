<template>
  <q-page-container>
    <q-page>
      <!-- navbar -->
      <div class="blob-top">
        <q-toolbar class="q-pa-none">
          <nav class="menu">
            <div class="menu__logo">
              <img src="@/assets/img/logo.png" alt="NSDSK logo" />
            </div>
            <ul class="menu__nav">
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </q-toolbar>

        <!-- main content -->
        <div class="blob-string">
          <div class="row no-pad">
            <div class="col-12 col-sm q-pa-none">
              <div class="block-intro">
                <div class="block-intro__content">
                  <h1>Natuurlijk</h1>
                  <br />
                  <h1>communiceren</h1>
                  <p>
                    Informatievoorziening voor ouders (en betrokken) van een
                    jong kind met gehoorverlies. Bekijk ook eens onze website
                    www.nsdsk.nl
                  </p>
                  <div class="downloads">
                    <img
                      src="@/assets/img/download_appstore.png"
                      alt="NSDSK logo"
                    />
                    <img
                      src="@/assets/img/download_playstore.png"
                      alt="NSDSK logo"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- preview image -->
            <div class="col-12 col-sm">
              <div class="mobile-preview">
                <div class="mobile-preview__image">
                  <img src="@/assets/img/phone_preview.png" alt="NSDSK logo" />
                </div>
              </div>
            </div>
          </div>

          <!-- block 1 -->
          <div class="block-wrapper blob-mid">
            <div class="row no-pad">
              <div class="col-12 q-pa-none">
                <div class="block-elem block-elem-l">
                  <div class="block-elem__image-l">
                    <img src="@/assets/img/NSDSK_1.png" alt="Man met kind" />
                  </div>
                  <div class="block-elem__content-l">
                    <h2>Wat is natuurlijk communiceren?</h2>
                    <p>
                      Natuurlijk communiceren is de app die een extra
                      informatievoorziening biedt voor ouders (en betrokkenen)
                      van een jong kind met gehoorverlies.
                    </p>
                  </div>
                </div>
              </div>

              <!-- block 2 -->
              <div class="col-12 q-pa-none">
                <div class="block-elem block-elem-r">
                  <div class="block-elem__content-r">
                    <h2>Waarom hebben we deze app?</h2>
                    <p>
                      Ouders krijgen veelal vlak na de geboorte te horen dat hun
                      kind een gehoorprobleem heeft, en krijgen via NSDSK
                      voorlichting in de vorm van ontmoetingen en documentatie.
                      De app gaat dit proces ondersteunen.
                    </p>
                  </div>
                  <div class="block-elem__image-r">
                    <img
                      src="@/assets/img/NSDSK_2.png"
                      alt="Vrouw met kinderen"
                    />
                  </div>
                </div>
              </div>

              <!-- block 3 -->
              <div class="col-12 q-pa-none">
                <div class="block-elem block-elem-l">
                  <div class="block-elem__content-l">
                    <h2>Hoe werkt de app?</h2>
                    <p>
                      De geboortedatum van uw kind wordt gebruikt om juiste
                      artikelen te tonen die passen bij de levensfase van uw
                      kind. Hiermee krijgt u een digitaal gefilterd beeld van de
                      informatie die u op dit moment en in de situatie nodig
                      hebt.
                    </p>
                  </div>
                  <div class="block-elem__image-l">
                    <img src="@/assets/img/NSDSK_3.png" alt="Vrouw met kind" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- footer -->
          <div class="row no-pad">
            <div class="col no-pad">
              <div class="footer">
                <ul>
                  <li><a href="#">Terms of use</a></li>
                  <li><a href="#">Privacy policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  name: 'landing-page'
}
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.block-wrapper {
  height: 100%;
  margin: 0px auto;
  padding: 0px 200px;
  width: 100%;

  @media (max-width: $breakpoint-md-max) {
    padding: 0px 100px;
  }

  @media (max-width: $breakpoint-sm-max) {
    padding: 0;
  }
}

.blob {
  &-top {
    background: url("~@/assets/svg/blob-top.svg");
    background-repeat: no-repeat;
    background-size: 50% contain;
    background-position: right 0 top 0;

    @media (max-width: $breakpoint-xs-max) {
      background-size: 50%;
    }
  }

  &-string {
    background: url("~@/assets/svg/blob-string.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0 18rem;
  }

  &-mid {
    background: url("~@/assets/svg/blob-bottom.svg");
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.mobile-preview {
  margin: 7rem 0rem 2rem;

  @media (max-width: $breakpoint-sm-max) {
    margin: 5rem 0rem;
  }

  &__image {
    margin: 0px 30px;
    img {
      object-fit: contain;

      @media (max-width: $breakpoint-sm-max) {
        max-width: 100%;
        height: auto;
      }
    }
  }
}

.block-intro {
  margin: 10rem auto;

  @media (max-width: $breakpoint-sm-max) {
    margin: 6rem 0rem 0rem;
  }

  @media (max-width: $breakpoint-xs-max) {
    margin: 3rem 0rem 0rem;
  }

  &__content {
    padding: 40px 0 40px 100px;
    margin: 0 auto;
    max-width: 700px;

    @media (max-width: $breakpoint-sm-max) {
      padding: 40px 0 40px 50px;
    }

    @media (max-width: $breakpoint-xs-max) {
      padding: 40px 10px 0px;
      font-size: 2.4rem !important;
      line-height: 1.4rem !important;
    }
  }

  h1 {
    @media (max-width: $breakpoint-sm-max) {
      font-size: 4rem !important;
      line-height: 3rem !important;
    }

    @media (max-width: $breakpoint-xs-max) {
      font-size: 3.5rem !important;
      line-height: 3.2rem !important;
    }
  }

  p {
    font-family: "Lato-Regular", Helvetica, Arial;
    font-size: 2.5rem;
    line-height: 5rem;
    color: #060517;
    text-align: left;
    min-width: 250px;
    max-width: 800px;
    margin: 2rem 0rem 3rem;

    @media (max-width: $breakpoint-sm-max) {
      font-size: 2rem;
      line-height: 3.5rem;
      max-width: 400px;
    }

    @media (max-width: $breakpoint-xs-max) {
      font-size: 2rem;
      line-height: 3rem;
      max-width: 400px;
    }
  }

  .downloads {
    display: flex;

    img {
      margin-right: 1.2rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.block-elem {
  display: grid;
  margin: 7rem 0rem;

  &-l {
    grid-template: "block-image block-content";

    @media (max-width: $breakpoint-sm-max) {
      margin: 2rem 0;
      grid-template:
        [block-image] "block-image"
        [block-content] "block-content";
    }
  }

  &-r {
    grid-template: "block-content block-image";

    @media (max-width: $breakpoint-sm-max) {
      margin: 2rem 0;
      grid-template:
        [block-image] "block-image"
        [block-content] "block-content";
    }
  }

  &__content-l {
    grid-area: block-content;
    padding: 0px 0px 40px 0px;

    @media (max-width: $breakpoint-sm-max) {
      padding: 40px 20px;
    }

    @media (max-width: $breakpoint-xs-max) {
      padding: 40px 5px;
    }
  }

  &__content-r {
    grid-area: block-content;
    padding: 0px 0px 40px 0px;

    @media (max-width: $breakpoint-sm-max) {
      padding: 40px 20px;
    }

    @media (max-width: $breakpoint-xs-max) {
      padding: 40px 5px;
    }
  }

  h2 {
    @media (max-width: $breakpoint-sm-max) {
      text-align: center !important;
      font-size: 3.4rem !important;
      line-height: 2.4rem !important;
    }

    @media (max-width: $breakpoint-xs-max) {
      text-align: center !important;
      font-size: 2.8rem !important;
      line-height: 3.5rem !important;
    }
  }

  p {
    font-family: Helvetica, Arial;
    font-size: 2.1rem;
    line-height: 3.5rem;
    color: #060517;
    text-align: left;
    margin: 1rem 0;
    max-width: 1000px;

    @media (max-width: $breakpoint-sm-max) {
      text-align: center !important;
      font-size: 1.8rem;
      line-height: 3rem;
      margin: 2rem auto;
      max-width: 700px;
    }

    @media (max-width: $breakpoint-xs-max) {
      text-align: center !important;
      font-size: 1.6rem;
      line-height: 2.6rem;
      margin: 2rem auto;
    }
  }

  &__image-l {
    grid-area: block-image;
    margin-right: 5rem;

    @media (max-width: $breakpoint-sm-max) {
      margin: 0 auto;
    }

    img {
      height: 320px;
      object-fit: contain;

      @media (max-width: $breakpoint-sm-max) {
        height: 200px;
        max-width: 100%;
        height: auto;
      }
    }
  }

  &__image-r {
    grid-area: block-image;
    margin-left: 4rem;

    @media (max-width: $breakpoint-sm-max) {
      margin: 0 auto;
    }

    img {
      height: 350px;
      object-fit: contain;

      @media (max-width: $breakpoint-sm-max) {
        height: 200px;
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>
