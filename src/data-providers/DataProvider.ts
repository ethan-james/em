import { Index, Lexeme, Thought, ThoughtId } from '../@types'

/** A standard interface for data providers that can sync thoughts. See data-providers/README.md. */
export interface DataProvider {
  clearAll: () => Promise<unknown>
  getThoughtById: (id: string) => Promise<Lexeme | undefined>
  getThoughtsByIds: (ids: string[]) => Promise<(Lexeme | undefined)[]>
  getContextById: (id: ThoughtId) => Promise<Thought | undefined>
  getContextsByIds: (ids: ThoughtId[]) => Promise<(Thought | undefined)[]>
  updateThought: (id: string, thought: Lexeme) => Promise<unknown>
  updateContext: (id: ThoughtId, Parent: Thought) => Promise<unknown>
  updateContextIndex: (contextIndex: Index<Thought>) => Promise<unknown>
  updateThoughtIndex: (thoughtIndex: Index<Lexeme>) => Promise<unknown>
}
