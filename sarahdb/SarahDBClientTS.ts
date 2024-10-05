import { decrypt } from './SarahEncrypt';
import { retTr } from './__trash';

/**
 * Decrypts and retrieves the connection key.
 * @constant {string}
 */
const CON_KEY: string = decrypt(decrypt(decrypt(decrypt(retTr()))));
console.log(CON_KEY);

/**
 * Base URL for the database server.
 * @constant {string}
 */
const from: string = "https://sarahdb.pythonanywhere.com";

/**
 * Prefix for all API endpoints.
 * @constant {string}
 */
const link_prefix: string = `${from}/${CON_KEY}/handler`;

/**
 * URL for database login.
 * @constant {string}
 */
const DB_URL: string = `${from}/login/${CON_KEY}`;

/**
 * Interface for column-value pairs
 */
interface ColumnValuePairs {
  [key: string]: string | number | boolean;
}

/**
 * Database ORM class for handling database operations.
 */
class DbORM {
  private database: Record<string, any>;

  /**
   * Creates an instance of DbORM.
   */
  constructor() {
    this.database = {};
  }

  /**
   * Establishes a connection to the database server.
   * @async
   * @returns {Promise<void>}
   */
  async connect(): Promise<void> {
    try {
      const response = await fetch(DB_URL);
      if (response.ok) {
        console.log("Connected to db server successfully");
        console.log(`\n\n>>>>>>>>>>>>>>>>>>>>>${await response.text()}\n\n\n`);
      } else {
        console.log("Error connecting to db server");
      }
    } catch (error) {
      console.error("Error connecting to db server:", error);
    }
  }

  /**
   * Sends a GET request and returns the response as text.
   * @async
   * @param {string} url - The URL to send the request to.
   * @returns {Promise<string>} The response text.
   */
  private async requestThenText(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
  }

  /**
   * Sends a POST request with JSON data and returns the response as text.
   * @async
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<string>} The response text.
   */
  private async requestThenTextPost(url: string, data: Record<string, any>): Promise<string> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.text();
  }

  /**
   * Retrieves all data from the database.
   * @async
   * @returns {Promise<Record<string, any>>} All database data.
   */
  async all(): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/handler`));
  }

  /**
   * Retrieves all entries for a specific model.
   * @async
   * @param {string} model - The model name.
   * @returns {Promise<Record<string, any>>} All entries for the specified model.
   */
  async getAll(model: string): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/get_all/${model}`));
  }

  /**
   * Finds all entries in a model where a column matches a specific value.
   * @async
   * @param {string} model - The model name.
   * @param {string} column - The column name.
   * @param {string} value - The value to match.
   * @returns {Promise<Record<string, any>>} Matching entries.
   */
  async findAll(model: string, column: string, value: string): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/find_all/${model}/${column}/${value}`));
  }

  /**
   * Adds a single entry to a model.
   * @async
   * @param {string} model - The model name.
   * @param {string} column - The column name.
   * @param {string} value - The value to add.
   * @returns {Promise<Record<string, any>>} Result of the operation.
   */
  async addOne(model: string, column: string, value: string): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/add_one/${model}/${column}/${value}`));
  }

  /**
   * Adds a new entry to a model with multiple column-value pairs.
   * @async
   * @param {string} model - The model name.
   * @param {ColumnValuePairs} columnValuePairs - Object containing column-value pairs.
   * @returns {Promise<Record<string, any>>} Result of the operation.
   */
  async addEntry(model: string, columnValuePairs: ColumnValuePairs): Promise<Record<string, any>> {
    try {
      const data = {
        model: model,
        column_value_pairs: JSON.stringify(columnValuePairs)
      };
      return JSON.parse(await this.requestThenTextPost(`${link_prefix}/add_entry`, data));
    } catch (error) {
      console.error(`Error in addEntry: ${error}\nmodel: ${model}\ncvp: ${JSON.stringify(columnValuePairs)}`);
      throw error;
    }
  }

  /**
   * Finds a single entry in a model where a column matches a specific value.
   * @async
   * @param {string} model - The model name.
   * @param {string} column - The column name.
   * @param {string} value - The value to match.
   * @returns {Promise<Record<string, any>>} The matching entry.
   */
  async findOne(model: string, column: string, value: string): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/find_one/${model}/${column}/${value}`));
  }

  /**
   * Updates a single entry in a model.
   * @async
   * @param {string} model - The model name.
   * @param {string} column - The column name to search.
   * @param {string} valueSearch - The value to search for.
   * @param {string} valueUpdate - The new value to set.
   * @returns {Promise<Record<string, any>>} Result of the operation.
   */
  async updateOne(model: string, column: string, valueSearch: string, valueUpdate: string): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/update_one/${model}/${column}/${valueSearch}/${valueUpdate}`));
  }

  /**
   * Updates an entry in a model with multiple column-value pairs.
   * @async
   * @param {string} model - The model name.
   * @param {string} column - The column name to search.
   * @param {ColumnValuePairs} columnValuePairs - Object containing column-value pairs to update.
   * @param {boolean} dnd - Flag for using a different endpoint.
   * @returns {Promise<Record<string, any>>} Result of the operation.
   */
  async updateEntry(model: string, column: string, columnValuePairs: ColumnValuePairs, dnd: boolean): Promise<Record<string, any>> {
    if (dnd) {
      const data = {
        model: model,
        column: column,
        cvp: JSON.stringify(columnValuePairs)
      };
      return JSON.parse(await this.requestThenTextPost(`${link_prefix}/update_entry_dnd`, data));
    } else {
      return JSON.parse(await this.requestThenText(`${link_prefix}/update_entry/${model}/${column}/${JSON.stringify(columnValuePairs)}`));
    }
  }

  /**
   * Deletes an entry from a model.
   * @async
   * @param {string} model - The model name.
   * @param {string} column - The column name to identify the entry.
   * @returns {Promise<Record<string, any>>} Result of the operation.
   */
  async deleteEntry(model: string, column: string): Promise<Record<string, any>> {
    return JSON.parse(await this.requestThenText(`${link_prefix}/delete_entry/${model}/${column}`));
  }

  /**
   * Sanitizes a string by removing potentially harmful characters.
   * @param {string} string - The string to sanitize.
   * @returns {string} The sanitized string.
   */
  sanitizeString(string: string): string {
    return string.replace(/['"/\\]/g, '');
  }

  /**
   * Retrieves base64 encoded media by its ID.
   * @async
   * @param {string} mediaID - The ID of the media to retrieve.
   * @returns {Promise<string | null>} The base64 encoded media or null if not found.
   */
  async getBase64Media(mediaID: string): Promise<string | null> {
    const result = await this.findOne('base64_images', 'id', mediaID);
    if (result.status[0] === "not found") {
      return null;
    } else {
      const allImages = await this.getAll('base64_images');
      return allImages[result.status[1]].base64;
    }
  }
}

export default new DbORM();