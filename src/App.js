import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function CharacterCounter() {
  return (
    <div style={{ padding: 10 }}>
      <h1>Core Concepts</h1>
      <h2>
          (RecoilRoot,
          atom,
          selector,
          useRecoilState,
          useRecoilValue)
      </h2>
      <h2>Atoms</h2>
      <p>Atoms are units of state. <br />They're updatable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value.</p>
      <p>Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom</p>
      <p>Components that need to read from and write to an atom should use <b>useRecoilState()</b></p>
      <h2>Selectors</h2>
      <p>A selector is a pure function that accepts atoms or other selectors as input. <br />When these upstream atoms or selectors are updated, the selector function will be re-evaluated. Components can subscribe to selectors just like atoms, and will then be re-rendered when the selectors change.</p>
      <p>Selectors are defined using the selector function</p>
      <p>The get property is the function that is to be computed.
        <br />It can access the value of atoms and other selectors using the get argument passed to it.
        <br />Updating the other atom or selector will cause it to be recomputed
      </p>
      <p>A selector represents a piece of <b>derived state</b>. Derived state is a <b>transformation</b> of state.</p>
      <p>Use the <b>useRecoilValue()</b> hook to read the derived state value</p>
      <h2>RecoilRoot</h2>
      <p>Components that use recoil state need RecoilRoot to appear somewhere in the parent tree.</p>
      <div>
        <h4>Sample App:</h4>
        <h5>Text Input is the Atoms and CharacterCount is the Selector</h5>
        <TextInput />
        <CharacterCount />
      </div>
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

export default App;
