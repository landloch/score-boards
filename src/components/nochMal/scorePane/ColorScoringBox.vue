<script setup lang="ts">

export const ColorScoringBox = ({
  score,
  color,
  index,
}: {
  score: number;
  color: Colors;
  index: string;
}) => {
  const stateArray: Mark[] = [Mark.Blank, Mark.Circled, Mark.Scratched];
  const { colorBoxesMarkedState, colorBoxesMarkedDispatch } = useScoreContext();

  const getState = () =>
    colorBoxesMarkedState.find((el) => el.index === index)!.mark;

  function handleClick = () => {
    const nextMark = stateArray[(getState() + 1) % 3];
    colorBoxesMarkedDispatch({
      type: "mark",
      index: index,
      mark: nextMark,
    });
  };

</script>

<template>
  <span class="`box ${color}`" @click="handleClick">
      <span class="light" />
      <svg
        fill={ColorMap.get(color)}
        stroke={ColorMap.get(color)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.5}
        className="character"
      >
        <text
          x="47%"
          y="50%"
          fontSize="24"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {score}
        </text>
      </svg>
      {getState() === Mark.Scratched && <Cross />}
      {getState() === Mark.Circled && <Circled />}
    </span>
</template>

<style>

</style>