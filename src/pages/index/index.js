import React, { Component } from 'react';

class Index extends Component {
  render () {
    return <div className='container'>
      <div className='main-content-wrapper'>
        <section className='doc-content'>
          <h1>Meters &amp; Progress</h1>
          <h2 id='meters'>Meters</h2>
          <p>Use the <code className='highlighter-rouge'>&lt;meter&gt;</code> element to represent either a scalar value within a known range or a fractional value.</p>

          <div className='hiq-example'>
            <meter min='0' max='100' low='25' high='75' optimum='100' value='10' />
            <meter min='0' max='100' low='25' high='75' optimum='100' value='50' />
            <meter min='0' max='100' low='25' high='75' optimum='100' value='80' />
          </div>

          <div className='highlight'>
            <pre>
              <code className='language-html' data-lang='html'>
                <span className='nt'>&lt;meter</span> <span className='na'>min=</span> <span className='s'>'0'</span> <span className='na'>max=</span> <span className='s'>'100'</span> <span className='na'>low=</span> <span className='s'>'25'</span> <span className='na'>high=</span> <span className='s'>'75'</span> <span className='na'>optimum=</span> <span className='s'>'100'</span> <span className='na'>value=</span> <span className='s'>'10'</span><span className='nt'>&gt;&lt;/meter&gt;</span>
                <span className='nt'>&lt;meter</span> <span className='na'>min=</span> <span className='s'>'0'</span> <span className='na'>max=</span> <span className='s'>'100'</span> <span className='na'>low=</span> <span className='s'>'25'</span> <span className='na'>high=</span> <span className='s'>'75'</span> <span className='na'>optimum=</span> <span className='s'>'100'</span> <span className='na'>value=</span> <span className='s'>'50'</span><span className='nt'>&gt;&lt;/meter&gt;</span>
                <span className='nt'>&lt;meter</span> <span className='na'>min=</span> <span className='s'>'0'</span> <span className='na'>max=</span> <span className='s'>'100'</span> <span className='na'>low=</span> <span className='s'>'25'</span> <span className='na'>high=</span> <span className='s'>'75'</span> <span className='na'>optimum=</span> <span className='s'>'100'</span> <span className='na'>value=</span> <span className='s'>'80'</span><span className='nt'>&gt;&lt;/meter&gt;</span>
              </code>
            </pre>
          </div>

          <table className='properties-table'>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='name'><code>--hiq-meter-background-color</code></td>
                <td>Sets the background color of the meter element track.</td>
              </tr><tr>
                <td className='name'><code>--hiq-meter-strong-color</code></td>
                <td>Sets the background color of the meter bar with an optimum value.</td>
              </tr><tr>
                <td className='name'><code>--hiq-meter-good-color</code></td>
                <td>Sets the background color of the meter bar with a sub-optimum value.</td>
              </tr><tr>
                <td className='name'><code>--hiq-meter-weak-color</code></td>
                <td>Sets the background color of the meter bar with a weak value.</td>
              </tr>
            </tbody>
          </table>
          <p>
            <small>NOTE: The meter element is currently not supported in Edge or Internet Explorer.</small>
          </p>

          <h2 id='progress-bars'>Progress Bars</h2>
          <p>Use the <code className='highlighter-rouge'>&lt;progress&gt;</code> element to represent the completion progress of a task as a progress bar.</p>
          <div className='hiq-example'>
            <progress value='50' max='100'>progress</progress>
          </div>
          <div className='highlight'>
            <pre>
              <code className='language-html' data-lang='html'>
                <span className='nt'>&lt;progress</span>
                <span className='na'>value=</span>
                <span className='s'>'50'</span>
                <span className='na'>max=</span>
                <span className='s'>'100'</span>
                <span className='nt'>&gt;</span>progress<span className='nt'>&lt;/progress&gt;</span>
              </code>
            </pre>
          </div>

          <p>If a progress bar has no value defined on it, it will display an indeterminate loading animation.</p>

          <div className='hiq-example'>
            <progress>indeterminate progress</progress>
          </div>

          <div className='highlight'>
            <pre>
              <code className='language-html' data-lang='html'>
                <span className='nt'>&lt;progress&gt;</span>indeterminate progress<span className='nt'>&lt;/progress&gt;</span>
              </code>
            </pre>
          </div>

          <table className='properties-table'>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='name'><code>--hiq-progress-height</code></td>
                <td>Sets the height of the progress element.</td>
              </tr>
              <tr>
                <td className='name'><code>--hiq-progress-background-color</code></td>
                <td>Sets the background color of the progress element track.</td>
              </tr>
              <tr>
                <td className='name'><code>--hiq-progress-filled-color</code></td>
                <td>Sets the background color of the filled portion of the progress element.</td>
              </tr>
            </tbody>
          </table>
          <p><small>NOTE: Indeterminate progress bar styling is currently not supported in Edge or Internet Explorer.</small></p>
        </section>
      </div>
    </div>;
  }
}

Index.propTypes = {
  // store: PropTypes.object.isRequired
};

Index.defaultProps = {

};

export default Index;
