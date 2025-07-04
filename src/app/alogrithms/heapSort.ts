let animations: any = [];
let array_length = 0;
export function getAnimationsForHeapSort(unsortedArray: any)
{
  let array = unsortedArray.slice();
  heapSort(array);
  let tempAnimations = animations.slice();
  animations = [];
  return tempAnimations;
}

function heap_root(input: any, i: number) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
      max = left;
  }

  if (right < array_length && input[right] > input[max])     {
      max = right;
  }

  if (max != i) {
      swap(input, i, max);
      heap_root(input, max);
  }
}

function swap(input: any, index_A: number, index_B: number) {
  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;

  animations.push(["HighLightOn",index_A,index_B]);
  animations.push(["HighLightOff",index_A,index_B]);
  animations.push(["Swap",index_A,input[index_A],index_B,input[index_B]]);
}

function heapSort(input: any) {

  array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
      heap_root(input, i);
    }

  for (i = input.length - 1; i > 0; i--) {
      swap(input, 0, i);
      animations.push([]);
      array_length--;
      heap_root(input, 0);
  }
}
