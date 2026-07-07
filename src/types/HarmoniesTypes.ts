export type HamoniesBoardState = {
  p0: HarmoniesPlayerState,
  p1: HarmoniesPlayerState,
  p2: HarmoniesPlayerState,
  p3: HarmoniesPlayerState,
}

export type HarmoniesPlayerState = {
  name: string,
  terrainScores: {
    greenScore: number,
    grayScore: number,
    yellowScore: number,
    redScore: number,
    blueScore: number,
  },
  cubeScores: {
    cubeScore0: number,
    cubeScore1: number,
    cubeScore2: number,
    cubeScore3: number,
    cubeScore4: number,
    cubeScore5: number,
    cubeScore6: number,
    cubeScore7: number,
  },
}