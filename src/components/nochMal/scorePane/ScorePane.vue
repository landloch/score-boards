<script setup lang="ts">
  import { useScoreStore } from '@/stores/scoreStore';
  import { ref } from 'vue';
  import { Colors } from '@/types/NochMalTypes.ts';
  import ShareButton from '../sidePane/ShareButton.vue';
  import EraserButton from '../sidePane/EraserButton.vue';
  import ScoreStar from './ScoreStar.vue';
  import ScoreJoker from './ScoreJoker.vue';
  import Bonus from './Bonus.vue';
  import ColorFirstScoringBox from './ColorFirstScoringBox.vue';
  import ColorLaterScoringBox from './ColorLaterScoringBox.vue';

  const {
    colorScore, letterScore, jokerScore, starScore
  } = useScoreStore();
</script>

<template>
  <div class="column right">
      <div class="row right">
        <ColorFirstScoringBox :color="Colors.Green" index="R1st" />
        <ColorLaterScoringBox :color="Colors.Green" index="R2nd" />
      </div>
      <div class="row right">
        <ColorFirstScoringBox :color="Colors.Yellow" index="G1st" />
        <ColorLaterScoringBox :color="Colors.Yellow" index="G2nd" />
      </div>
      <div class="row right">
        <ColorFirstScoringBox :color="Colors.Blue" index="B1st" />
        <ColorLaterScoringBox :color="Colors.Blue" index="B2nd" />
      </div>
      <div class="row right">
        <ColorFirstScoringBox :color="Colors.Red" index="Y1st" />
        <ColorLaterScoringBox :color="Colors.Red" index="Y2nd" />
      </div>
      <div class="row right">
        <ColorFirstScoringBox :color="Colors.Orange" index="O1st" />
        <ColorLaterScoringBox :color="Colors.Orange" index="O2nd" />
      </div>
      <div class="row right">
        <Bonus />
        <span class="score-container">
          <span>=</span>
          <span class="score">{{ colorScore() }}</span>
        </span>
      </div>
      <div class="row right">
        <span class="score-label letter-score">A-O</span>
        <span class="score-container">
          <span class="text-green">+</span>
          <span class="score">{{ letterScore() }}</span>
        </span>
      </div>
      <div class="row right">
        <ScoreJoker />
        <span class="score-container">
          <span class="text-green">+</span>
          <span class="score">{{ jokerScore() }}</span>
        </span>
      </div>
      <div class="row right">
        <ScoreStar />
        <span class="score-container">
          <span class="text-red">-</span>
          <span class="score">{{ starScore() }}</span>
        </span>
      </div>
      <div class="row right">
        <span class="spacer">---------------</span>
      </div>
      <div class="row right">
        <span class="score-label letter-score">TOTAL</span>
        <span class="score-container">
          <span>=</span>
          <span class="score">
            {{ colorScore() + jokerScore() + letterScore() + starScore() }}
          </span>
        </span>
      </div>
      <div class="row right" style="margin-top: auto">
        <ShareButton />
        <EraserButton />
      </div>
    </div>
</template>

<style scoped>
  .right {
    width: 100%;
    display: flex;
    justify-content: right;
  }

  .light {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background-color: #fff5;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .bonus {
    width: 94px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    background-color: transparent;
    font-weight: 1000;
  }

  .text {
    font-size: 24px;
    transform:scaleX(1.2);
    -webkit-transform: scaleX(1.2);
  }

  .score-container {
    width: 66px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border-radius: 5px;
    background: white;
    align-items: center;
    box-sizing: border-box;
    padding: 4px;
    font-size: 32px;
    justify-content: space-between;
  }

  .text-red {
    color: var(--red);
  }

  .text-green {
    color: var(--green);
  }

  .score-label {
    align-items: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    height: 32px;
    color: #fff;
    box-sizing: border-box;
    padding: 4px;
    letter-spacing: 1px;
  }

  .letter-score {
    font-size: 28px;
    padding-right: 8px;
    transform:scale(1.2,1);
  }

  .joker-score {
    width: 26px;
    height: 26px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border-radius: 50%;
    position: relative;
    background-color: white;
    box-sizing: border-box;
  }

  .small-text {
    height: 100%;
    font-size: 14px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    align-items: flex-end;
    padding: 4px;
  }

  .score {
    height: 100%;
    font-size: 22px;
    padding-right: 2px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    align-items: flex-end;
  }

  .spacer {
    align-items: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    height: 18px;
    color: #fff;
    box-sizing: border-box;
    padding: 4px;
    letter-spacing: 1px;
    font-size: 28px;
    transform:scale(1.2,1);
    transform:translate(0px, 0px);
  }

  .resset-button {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background: white;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }
</style>