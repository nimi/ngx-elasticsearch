import { State } from "./State"
import { isArray, take, size, without, indexOf } from "lodash";
import { update } from '../utils/immutability-helper';

/**
 * @name LevelState
 * @description
 * 
 * State wrapper tree structures, trees are mutated
 * with a set of immutability helpers.
 */
export class LevelState extends State<Array<any>> {

  /**
   * Get the current value or default to an empty array
   */
  getValue() {
    return this.value || [];
  }

  /**
   * @name add
   * @description Update array state
   * @param level 
   * @param val 
   */
  add(level: number, val: any): LevelState {
    let arr = this.getValue();
    // create array state at index if it doesn't exist
    if (!isArray(arr[level])) {
      arr = update(arr, {
        [level]: { $set: [] }
      });
    }

    // create an updated array state
    return this.create(
      update(arr, {
        [level]: { $push: [val] }
      })
    );
  }

  /**
   * @name contains
   * @description
   * Check if value exists at specified index/level
   * @param level 
   * @param val 
   */
  contains(level: number, val: any): boolean {
    return indexOf(this.getValue()[level], val) !== -1;
  }

  /**
   * @name clear
   * @description
   * Clear levels beyond provided level/index
   * @param level 
   */
  clear(level: number = 0): LevelState {
    return this.create(take(this.getValue(), level));
  }

  /**
   * @name remove
   * @description
   * Remove values stored at a specified level/index
   * @param level 
   * @param val 
   */
  remove(level: number, val: any): LevelState {
    return this.create(update(this.getValue(), {
      [level]: { $set:without(this.getValue()[level], val) }
    }));
  }

  /**
   * @name toggle
   * @description Toggle value within a given level/index
   * @param level 
   * @param val 
   */
  toggle(level: number, val: any): LevelState {
    return this.contains(level, val)
      ? this.remove(level, val)
      : this.add(level, val);
  }

  /**
   * @name getLevel
   * @description Get level by level number
   * @param level 
   */
  getLevel(level: number): Array<string> {
    return this.getValue()[level] || [];
  }

  /**
   * @name levelHasFilters
   * @description Check if level has any existing filters
   * @param level 
   */
  levelHasFilters(level: number): boolean {
    return this.getLevel(level).length > 0;
  }

  /**
   * @name getLeafLevel
   * @description Get the size of the level state value
   */
  getLeafLevel(): number {
    return size(this.value) - 1;
  }

  /**
   * @name isLeafLevel
   * @description Checks if the level is the leaf
   * @param level 
   */
  isLeafLevel(level: number): boolean {
    return level === this.getLeafLevel()
  }

  /**
   * @name toggleLevel
   * @description Toggles the level
   * @param level 
   * @param key 
   */
  toggleLevel(level: number, key: any): LevelState {
    if (this.contains(level, key)) {
      if (this.isLeafLevel(level)) {
        return this.clear(level);
      } else {
        return this.clear(level + 1);
      }
    } else {
      return this.clear(level)
        .add(level, key)
    }

  }

}
