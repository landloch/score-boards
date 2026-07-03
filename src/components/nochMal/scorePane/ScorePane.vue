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
  <div class="right">
    <table>
      <tbody>
        <tr>
          <td>
            <ColorFirstScoringBox :color="Colors.Green" index="G1st" />
          </td>
          <td>
            <ColorLaterScoringBox :color="Colors.Green" index="R2nd" />
          </td>
        </tr>
        <tr>
          <td>
            <ColorFirstScoringBox :color="Colors.Yellow" index="Y1st" />
          </td>
          <td>
            <ColorLaterScoringBox :color="Colors.Yellow" index="Y2nd" />
          </td>
        </tr>
        <tr>
          <td>
            <ColorFirstScoringBox :color="Colors.Blue" index="B1st" />
          </td>
          <td>
            <ColorLaterScoringBox :color="Colors.Blue" index="B2nd" />
          </td>
        </tr>
        <tr>
          <td>
            <ColorFirstScoringBox :color="Colors.Red" index="R1st" />
          </td>
          <td>
            <ColorLaterScoringBox :color="Colors.Red" index="R2nd" />
          </td>
        </tr>
        <tr>
          <td>
            <ColorFirstScoringBox :color="Colors.Orange" index="O1st" />
          </td>
          <td>
            <ColorLaterScoringBox :color="Colors.Orange" index="O2nd" />
          </td>
        </tr>
        <tr>
          <td colspan="2"><Bonus /></td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-container">
              <span>=</span>
              <span class="score">{{ colorScore() }}</span>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-label letter-score">A-O</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-container">
              <span class="text-green">+</span>
              <span class="score">{{ letterScore() }}</span>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <ScoreJoker />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-container">
              <span class="text-green">+</span>
              <span class="score">{{ jokerScore() }}</span>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <ScoreStar />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-container">
              <span class="text-red">-</span>
              <span class="score">{{ starScore() }}</span>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="spacer">------</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-label letter-score">TOTAL</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="score-container">
              <span>=</span>
              <span class="score">
                {{ colorScore() + jokerScore() + letterScore() + starScore() }}
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  table {
    width: fit-content;
    height: fit-content;

    td {
      text-align: right;
    }
  }

  .right {
    width: 100%;
    display: flex;
    justify-content: right;
  }

  .text {
    font-size: 24px;
    transform:scaleX(1.2);
    -webkit-transform: scaleX(1.2);
  }

  .score-container {
    width: 66px;
    height: 28px;
    display: flex;
    border-radius: 5px;
    background: white;
    align-items: center;
    box-sizing: border-box;
    padding: 4px;
    font-size: 28px;
    justify-content: space-between;
  }

  .text-red {
    color: var(--red);
  }

  .text-green {
    color: var(--green);
  }

  .score-label {
    width: 100%;
    align-items: center;
    display: flex;
    height: 2px;
    color: #fff;
    box-sizing: border-box;
    padding: 4px;
    letter-spacing: 1px;
    justify-content: end;
  }

  .letter-score {
    font-size: 24px;
    transform:scale(1.2,1);
  }

  .joker-score {
    width: 26px;
    height: 26px;
    display: flex;
    border-radius: 50%;
    position: relative;
    background-color: white;
    box-sizing: border-box;
  }

  .small-text {
    height: 100%;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    padding: 4px;
  }

  .score {
    height: 100%;
    font-size: 20px;
    padding-right: 2px;
    display: flex;
    align-items: flex-end;
  }

  .spacer {
    align-items: center;
    display: flex;
    height: 18px;
    color: #fff;
    box-sizing: border-box;
    padding: 4px;
    letter-spacing: 1px;
    font-size: 24px;
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